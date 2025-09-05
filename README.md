# NBA 2K26 Build Creator

A React Native app for creating and sharing NBA 2K26 MyCareer builds.

## Backend Setup

Your backend should implement the following API endpoints:

### Authentication Endpoints

#### POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Display Name",
  "displayName": "Display Name"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Display Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Display Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/auth/me
Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Display Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PUT /api/auth/profile
Headers: `Authorization: Bearer <token>`
```json
{
  "name": "New Display Name",
  "displayName": "New Display Name"
}
```

Response:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "New Display Name",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Build Endpoints

#### GET /api/builds
Optional Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "builds": [
    {
      "id": "build_id",
      "name": "Build Name",
      "position": "PG",
      "archetype": "Playmaker",
      "height": "6'3\"",
      "weight": "185",
      "wingspan": "6'8\"",
      "attributes": {
        "close_shot": 85,
        "driving_layup": 90,
        // ... other attributes
      },
      "badges": {
        "finishing": ["Acrobat", "Slithery"],
        // ... other badge categories
      },
      "userId": "user_id",
      "userName": "Display Name",
      "rating": 4.5,
      "reviewCount": 10,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/builds
Headers: `Authorization: Bearer <token>`
```json
{
  "name": "Build Name",
  "position": "PG",
  "archetype": "Playmaker",
  "height": "6'3\"",
  "weight": "185",
  "wingspan": "6'8\"",
  "attributes": {
    "close_shot": 85,
    "driving_layup": 90,
    // ... other attributes
  },
  "badges": {
    "finishing": ["Acrobat", "Slithery"],
    // ... other badge categories
  }
}
```

Response:
```json
{
  "build": {
    "id": "build_id",
    "name": "Build Name",
    // ... full build object
  }
}
```

#### PUT /api/builds/:id
Headers: `Authorization: Bearer <token>`
```json
{
  "name": "Updated Build Name",
  // ... other fields to update
}
```

#### DELETE /api/builds/:id
Headers: `Authorization: Bearer <token>`

Response: 200 OK

### Review Endpoints (Optional)

#### GET /api/reviews
Optional Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "reviews": [
    {
      "id": "review_id",
      "buildId": "build_id",
      "rating": 5,
      "comment": "Great build!",
      "userId": "user_id",
      "userName": "Display Name",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/reviews
Headers: `Authorization: Bearer <token>`
```json
{
  "buildId": "build_id",
  "rating": 5,
  "comment": "Great build!"
}
```

## Deployment

1. Deploy your backend to Render at https://nba2k26-backend.onrender.com
2. Make sure all the above endpoints are implemented
3. Use JWT tokens for authentication
4. Store user data and builds in a database (MongoDB, PostgreSQL, etc.)

## Deploy Hook

Your deploy hook: https://api.render.com/deploy/srv-d2tanlvdiees7383bfjg?key=j4EU-nxs1oA

Use this to trigger deployments when you update your backend code.