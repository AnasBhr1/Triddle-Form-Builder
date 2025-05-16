# Triddle - Fragmented Form Builder

A modern, TypeScript-powered form builder application with a React frontend and Node.js backend.

## Features

- 🚀 **Modern Stack**: React + TypeScript, Node.js + Express
- 🎨 **Beautiful UI**: TailwindCSS with dark mode support
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🔐 **Authentication**: JWT-based auth with role management
- 📊 **Analytics**: Comprehensive form analytics and insights
- 📁 **File Uploads**: Secure file uploads via Cloudinary
- 🌍 **Internationalization**: Multi-language support
- ⚡ **Real-time**: Auto-save functionality
- 🎯 **One-Question-at-a-Time**: Smooth animated form flow

## Tech Stack

### Frontend
- React 18 with TypeScript
- TailwindCSS + DaisyUI for styling
- React Query for data fetching
- Zustand for state management
- React Hook Form + Zod for form handling
- Framer Motion for animations
- Recharts for analytics visualization

### Backend
- Node.js + Express with TypeScript
- MongoDB with Mongoose ODM
- JWT authentication
- Cloudinary for file storage
- Rate limiting and security middleware
- Comprehensive API validation

## Prerequisites

Before you begin, ensure you have:

- Node.js 16+ installed
- MongoDB instance (local or cloud)
- Cloudinary account for file uploads
- Git installed

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/triddle-app.git
cd triddle-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd triddle-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# Required: MONGODB_URI, JWT_SECRET, CLOUDINARY credentials
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../triddle-frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
```

## Environment Configuration

### Backend (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/triddle

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional
ADMIN_EMAIL=admin@triddle.com
ADMIN_PASSWORD=admin123
```

### Frontend (.env)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Settings
REACT_APP_APP_NAME=Triddle
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_FILE_UPLOADS=true
```

## Running the Application

### Development Mode

1. **Start the Backend:**
```bash
cd triddle-backend
npm run dev
```
Backend will be available at http://localhost:5000

2. **Start the Frontend:**
```bash
cd triddle-frontend
npm start
```
Frontend will be available at http://localhost:3000

### Production Build

1. **Build Backend:**
```bash
cd triddle-backend
npm run build
npm start
```

2. **Build Frontend:**
```bash
cd triddle-frontend
npm run build
# Serve the build folder with a static server
```

## Concurrent Development

For development convenience, you can run both servers concurrently:

```bash
# Install concurrently globally
npm install -g concurrently

# From the project root, create a script to run both
# Add this to a new package.json in the root:
{
  "scripts": {
    "dev": "concurrently \"cd triddle-backend && npm run dev\" \"cd triddle-frontend && npm start\""
  }
}

# Then run:
npm run dev
```

## Default Admin Account

After setting up the backend, you can create an admin account:

1. Use the environment variables `ADMIN_EMAIL` and `ADMIN_PASSWORD`
2. Register normally, then manually update the user role in MongoDB to 'admin'
3. Or create an admin user via the API endpoint

## Project Structure

```
triddle-app/
├── triddle-backend/          # Backend API
│   ├── src/
│   │   ├── config/          # Database & third-party configs
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── server.ts        # Main server file
│   ├── .env                 # Environment variables
│   └── package.json
├── triddle-frontend/         # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API service functions
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   └── index.tsx        # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
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
- `GET /api/forms/public/:slug` - Get public form

### Responses
- `POST /api/forms/:id/responses` - Submit form response
- `GET /api/forms/:id/responses` - Get form responses
- `GET /api/forms/:id/analytics` - Get form analytics

### Uploads
- `POST /api/uploads/single` - Upload single file
- `POST /api/uploads/multiple` - Upload multiple files

## Key Features Implementation

### Authentication
- JWT tokens with httpOnly cookies
- Role-based access control (Guest, User, Admin)
- Password hashing with bcrypt
- Automatic token refresh

### Form Builder
- Drag-and-drop question reordering
- 13+ question types supported
- Real-time validation
- Auto-save functionality
- Theme customization

### Form Responses
- One-question-at-a-time flow
- Progress tracking
- Time spent analytics
- Device and geo detection

### Security
- Rate limiting on all endpoints
- Input validation with Joi/Zod
- CORS protection
- Secure file uploads
- Environment-based configuration

## Customization

### Adding New Question Types

1. **Backend**: Update the `QuestionType` enum in types
2. **Frontend**: Add the new type to the form builder UI
3. **Validation**: Update validation schemas accordingly

### Themes

Themes are configured in `src/types/index.ts`. Add new themes by extending the `THEME_CONFIGS` object.

### Internationalization

1. Add new language files in the i18n setup
2. Update the `SUPPORTED_LANGUAGES` array
3. Implement translations in components

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variables
5. Deploy

### Environment Variables for Production

Make sure to update:
- Database URLs
- JWT secrets
- CORS origins
- Cloudinary settings
- API endpoints

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly set in backend
2. **Database Connection**: Verify MongoDB URI and network access
3. **File Uploads**: Check Cloudinary credentials
4. **Build Errors**: Ensure all environment variables are set

### Debugging

- Check browser console for frontend errors
- Monitor backend logs for API issues
- Use React Query Devtools for state debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see the LICENSE file for details

## Support

For support, email [anasbhr1@hotmail.com] or create an issue on GitHub.

---

**Happy Building! 🚀**