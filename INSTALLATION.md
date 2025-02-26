# AI Agent Marketplace - Comprehensive Installation Guide

## 1. Pre-Installation Checklist

### System Requirements
- **Operating System:** Windows 10/11, macOS 10.15+, Linux (Ubuntu 20.04+ / Fedora 33+)
- **Hardware:**
  - Processor: Intel Core i5/AMD Ryzen 5 or better
  - RAM: 8GB (16GB recommended)
  - Storage: 10GB free disk space (SSD preferred)

### Software Prerequisites
- **Node.js:** v18.0.0 or later
- **npm:** v9.0.0 or later
- **Git:** v2.30 or later

## 2. Detailed Installation Steps

### A. Prepare Your Environment

#### Windows
1. **Install Node.js**
   - Download from [Node.js Official Website](https://nodejs.org/)
   - Run the installer
   - **Important:** Check "Automatically install the necessary tools"
   - Verify installation:
     ```powershell
     node --version
     npm --version
     ```

#### macOS
1. **Install Homebrew (Recommended)**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **Install Node.js via Homebrew**
   ```bash
   brew install node
   ```

#### Linux (Ubuntu/Debian)
1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

### B. Clone the Repository

```bash
# HTTPS
git clone https://github.com/your-username/ai-agent-marketplace.git

# Or SSH (recommended)
git clone git@github.com:your-username/ai-agent-marketplace.git

# Navigate to project directory
cd ai-agent-marketplace
```

### C. Install Project Dependencies

```bash
# Install all project dependencies
npm install

# Optional: Verify installation
npm list --depth=0
```

### D. Environment Configuration

1. **Create .env File**
   ```bash
   # For Unix-like systems
   touch .env

   # For Windows PowerShell
   New-Item -Path .env -ItemType File
   ```

2. **Configure Environment Variables**
   Open `.env` and add:
   ```
   VITE_API_BASE_URL=https://api.example.com
   VITE_API_KEY=your_api_key_here
   ```

## 3. Running the Application

### Development Mode
```bash
npm run dev
# Open http://localhost:5173 in your browser
```

### Production Build
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 4. Troubleshooting

### Common Installation Issues

#### Node.js Version Conflicts
- Use `nvm` (Node Version Manager)
  ```bash
  # Install nvm
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

  # Install and use specific Node.js version
  nvm install 18
  nvm use 18
  ```

#### Dependency Installation Problems
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

#### Firewall/Antivirus Blocking
- Temporarily disable firewall
- Add exceptions for Node.js and npm
- Configure proxy settings if behind a corporate network
  ```bash
  npm config set proxy http://proxy.company.com:8080
  npm config set https-proxy http://proxy.company.com:8080
  ```

## 5. Deployment Options

### Recommended Platforms
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

### Deployment Commands
```bash
# Build for production
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel

# Deploy to Netlify (requires Netlify CLI)
netlify deploy
```

## 6. Post-Installation Verification

1. Check application is running correctly
2. Test all major features
3. Verify responsive design on different devices

## 7. Recommended Development Tools

- **IDE:** Visual Studio Code
- **Extensions:**
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense
  - React Developer Tools

## 8. Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## Support

For additional help:
- Check [README.md](README.md)
- Review [REQUIREMENTS.md](REQUIREMENTS.md)
- Open an issue on the GitHub repository

---

**Last Updated:** February 2025
**Version:** 1.0.0
