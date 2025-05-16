# Triddle Backend

A TypeScript-powered backend API for the Triddle form builder application.

## Features

- **Authentication & Authorization**: JWT-based auth with role management
- **Form Management**: Create, update, delete, and manage forms
- **Response Collection**: Handle form submissions with analytics
- **File Uploads**: Secure file uploads via Cloudinary
- **Real-time Validation**: Server-side validation using Joi
- **Rate Limiting**: Protect API from abuse
- **Analytics**: Comprehensive form analytics and insights

## Tech Stack

- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Cloudinary** for file storage
- **Joi** for validation

## Setup

### Prerequisites

- Node.js 16+ installed
- MongoDB instance (local or cloud)
- Cloudinary account for file uploads

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from template:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/triddle
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Build and start the server:
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Forms
- `GET /api/forms` - Get user's forms
- `POST /api/forms` - Create new form
- `GET /api/forms/:id` - Get form by ID
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form
- `GET /api/forms/public/:slug` - Get public form by slug

### Responses
- `POST /api/forms/:id/responses` - Submit form response
- `GET /api/forms/:id/responses` - Get form responses
- `GET /api/forms/:id/analytics` - Get form analytics

### Uploads
- `POST /api/uploads/single` - Upload single file
- `POST /api/uploads/multiple` - Upload multiple files

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Clean build files
npm run clean
```

## Project Structure

```
src/
├── config/          # Database and external service configs
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── server.ts        # Main server file
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | - |

## Security Features

- Rate limiting on all routes
- JWT authentication with httpOnly cookies
- Input validation using Joi
- CORS protection
- File upload validation
- Password hashing with bcrypt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License