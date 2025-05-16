#!/bin/bash

# Triddle Setup Script
# This script helps set up the Triddle application for development

set -e

echo "🚀 Setting up Triddle - Fragmented Form Builder"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16+ and try again."
        exit 1
    fi
    
    NODE_VERSION=$(node -v)
    print_status "Node.js found: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    NPM_VERSION=$(npm -v)
    print_status "npm found: $NPM_VERSION"
}

# Check if MongoDB is running (optional)
check_mongodb() {
    if command -v mongod &> /dev/null; then
        print_status "MongoDB found locally"
    else
        print_warning "MongoDB not found locally. Make sure you have MongoDB Atlas or local MongoDB setup."
    fi
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    if [ ! -d "triddle-backend" ]; then
        print_error "triddle-backend directory not found!"
        exit 1
    fi
    
    cd triddle-backend
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_warning "Please edit triddle-backend/.env with your configuration"
    fi
    
    # Build TypeScript
    print_status "Building backend..."
    npm run build
    
    cd ..
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    if [ ! -d "triddle-frontend" ]; then
        print_error "triddle-frontend directory not found!"
        exit 1
    fi
    
    cd triddle-frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Copy environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_warning "Please edit triddle-frontend/.env with your configuration"
    fi
    
    cd ..
}

# Create root package.json for concurrent development
setup_concurrent() {
    print_status "Setting up concurrent development..."
    
    if [ ! -f "package.json" ]; then
        cat > package.json << EOF
{
  "name": "triddle-app",
  "version": "1.0.0",
  "description": "Triddle - Fragmented Form Builder",
  "scripts": {
    "dev": "concurrently \"cd triddle-backend && npm run dev\" \"cd triddle-frontend && npm start\"",
    "build": "cd triddle-backend && npm run build && cd ../triddle-frontend && npm run build",
    "start:backend": "cd triddle-backend && npm run dev",
    "start:frontend": "cd triddle-frontend && npm start",
    "install:all": "cd triddle-backend && npm install && cd ../triddle-frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOF
        npm install
        print_status "Created root package.json with concurrent scripts"
    fi
}

# Create VS Code settings
setup_vscode() {
    if [ ! -d ".vscode" ]; then
        mkdir .vscode
        
        # Create settings.json
        cat > .vscode/settings.json << EOF
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.rulers": [80, 120],
  "files.eol": "\n"
}
EOF

        # Create launch.json for debugging
        cat > .vscode/launch.json << EOF
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "\${workspaceFolder}/triddle-backend/src/server.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development"
      },
      "cwd": "\${workspaceFolder}/triddle-backend"
    }
  ]
}
EOF

        print_status "Created VS Code configuration"
    fi
}

# Main setup function
main() {
    echo
    print_status "Starting setup process..."
    echo
    
    # Check prerequisites
    check_node
    check_npm
    check_mongodb
    echo
    
    # Setup backend and frontend
    setup_backend
    echo
    setup_frontend
    echo
    
    # Setup development tools
    setup_concurrent
    setup_vscode
    echo
    
    print_status "Setup complete! 🎉"
    echo
    echo "Next steps:"
    echo "1. Configure your environment variables:"
    echo "   - triddle-backend/.env"
    echo "   - triddle-frontend/.env"
    echo
    echo "2. Start the development servers:"
    echo "   npm run dev"
    echo
    echo "3. Access the application:"
    echo "   - Frontend: http://localhost:3000"
    echo "   - Backend: http://localhost:5000"
    echo
    print_warning "Don't forget to set up MongoDB and Cloudinary!"
}

# Run main function
main