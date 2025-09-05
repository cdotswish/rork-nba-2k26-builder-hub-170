const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with a real database in production)
let users = [];
let builds = [];
let reviews = [];

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Optional middleware (allows both authenticated and unauthenticated requests)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  next();
};

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'NBA 2K26 Build Creator API',
    status: 'running',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        profile: 'PUT /api/auth/profile'
      },
      builds: {
        list: 'GET /api/builds',
        create: 'POST /api/builds',
        update: 'PUT /api/builds/:id',
        delete: 'DELETE /api/builds/:id'
      },
      reviews: {
        list: 'GET /api/reviews',
        create: 'POST /api/reviews'
      }
    }
  });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, displayName } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name: displayName || name,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/auth/profile', authenticateToken, (req, res) => {
  try {
    const { name, displayName } = req.body;
    
    if (!name && !displayName) {
      return res.status(400).json({ error: 'Name or displayName is required' });
    }

    const userIndex = users.findIndex(u => u.id === req.user.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user
    users[userIndex].name = displayName || name || users[userIndex].name;
    
    const { password: _, ...userWithoutPassword } = users[userIndex];
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Build Routes
app.get('/api/builds', optionalAuth, (req, res) => {
  try {
    // Return all builds with user information
    const buildsWithUserInfo = builds.map(build => {
      const user = users.find(u => u.id === build.userId);
      return {
        ...build,
        userName: user ? user.name : 'Unknown User'
      };
    });

    res.json({ builds: buildsWithUserInfo });
  } catch (error) {
    console.error('Get builds error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/builds', authenticateToken, (req, res) => {
  try {
    const { name, position, archetype, height, weight, wingspan, attributes, badges } = req.body;

    if (!name || !position || !archetype) {
      return res.status(400).json({ error: 'Name, position, and archetype are required' });
    }

    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const build = {
      id: Date.now().toString(),
      name,
      position,
      archetype,
      height: height || "6'3\"",
      weight: weight || "185",
      wingspan: wingspan || "6'8\"",
      attributes: attributes || {},
      badges: badges || {},
      userId: req.user.userId,
      userName: user.name,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    builds.push(build);
    
    res.status(201).json({ build });
  } catch (error) {
    console.error('Create build error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/builds/:id', authenticateToken, (req, res) => {
  try {
    const buildId = req.params.id;
    const buildIndex = builds.findIndex(b => b.id === buildId);
    
    if (buildIndex === -1) {
      return res.status(404).json({ error: 'Build not found' });
    }

    // Check if user owns the build
    if (builds[buildIndex].userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to update this build' });
    }

    // Update build
    builds[buildIndex] = {
      ...builds[buildIndex],
      ...req.body,
      id: buildId, // Ensure ID doesn't change
      userId: builds[buildIndex].userId, // Ensure userId doesn't change
      updatedAt: new Date().toISOString()
    };

    res.json({ build: builds[buildIndex] });
  } catch (error) {
    console.error('Update build error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/builds/:id', authenticateToken, (req, res) => {
  try {
    const buildId = req.params.id;
    const buildIndex = builds.findIndex(b => b.id === buildId);
    
    if (buildIndex === -1) {
      return res.status(404).json({ error: 'Build not found' });
    }

    // Check if user owns the build
    if (builds[buildIndex].userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this build' });
    }

    // Remove build
    builds.splice(buildIndex, 1);
    
    // Also remove associated reviews
    reviews = reviews.filter(r => r.buildId !== buildId);

    res.status(200).json({ message: 'Build deleted successfully' });
  } catch (error) {
    console.error('Delete build error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Review Routes
app.get('/api/reviews', optionalAuth, (req, res) => {
  try {
    // Return all reviews with user information
    const reviewsWithUserInfo = reviews.map(review => {
      const user = users.find(u => u.id === review.userId);
      return {
        ...review,
        userName: user ? user.name : 'Unknown User'
      };
    });

    res.json({ reviews: reviewsWithUserInfo });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/reviews', authenticateToken, (req, res) => {
  try {
    const { buildId, rating, comment } = req.body;

    if (!buildId || !rating) {
      return res.status(400).json({ error: 'Build ID and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if build exists
    const build = builds.find(b => b.id === buildId);
    if (!build) {
      return res.status(404).json({ error: 'Build not found' });
    }

    // Check if user already reviewed this build
    const existingReview = reviews.find(r => r.buildId === buildId && r.userId === req.user.userId);
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this build' });
    }

    const user = users.find(u => u.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const review = {
      id: Date.now().toString(),
      buildId,
      rating,
      comment: comment || '',
      userId: req.user.userId,
      userName: user.name,
      createdAt: new Date().toISOString()
    };

    reviews.push(review);

    // Update build rating
    const buildReviews = reviews.filter(r => r.buildId === buildId);
    const avgRating = buildReviews.reduce((sum, r) => sum + r.rating, 0) / buildReviews.length;
    
    const buildIndex = builds.findIndex(b => b.id === buildId);
    builds[buildIndex].rating = Math.round(avgRating * 10) / 10; // Round to 1 decimal
    builds[buildIndex].reviewCount = buildReviews.length;
    
    res.status(201).json({ review });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}`);
});

module.exports = app;