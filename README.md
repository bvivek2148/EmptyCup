# EmptyCup Property Listings Application

A modern, responsive web application for browsing, filtering, and shortlisting property listings. Built with a Flask backend and vanilla JavaScript frontend, featuring real-time property data, interactive shortlisting, and seamless user experience across all devices.

## 🌟 Live Demo: [EmptyCup Property Listings](https://emptycup-assignment-vivek.netlify.app/)

## 🌟 Live Demo

- **🌐 Frontend**: https://emptycup-assignment-vivek.netlify.app/
- **⚙️ Backend**: https://emptycup-backend-17wz.onrender.com
- **🔌 API**: https://emptycup-backend-17wz.onrender.com/api/listings
- **💻 Local Development**: `http://localhost:12001`

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Project Structure](#️-project-structure)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation Options](#-installation-options)
- [📖 Usage Guide](#-usage-guide)
- [🔌 API Documentation](#-api-documentation)
- [💻 Development](#-development)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🏠 Property Management
- **Featured Properties**: Homepage showcases 3 handpicked premium properties
- **Complete Listings**: Browse all 6 available properties with detailed information
- **High-Quality Images**: Professional property photos from Unsplash
- **Real-Time Data**: Dynamic property statistics and counts
- **Smart Filtering**: Filter by price range, bedrooms, and location
- **Advanced Search**: Search by property title, location, or description
- **Intelligent Sorting**: Sort by price (low/high), bedrooms, or area

### ❤️ Interactive Shortlisting
- **One-Click Shortlisting**: Add/remove properties with heart icon
- **Persistent Storage**: Shortlist saved across browser sessions
- **Visual Feedback**: Active states and animations for user actions
- **Dedicated Shortlist Section**: View all shortlisted properties on homepage
- **Cross-Page Sync**: Shortlist updates across all pages instantly

### 🎨 Modern User Interface
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Animated Elements**: Smooth transitions and loading animations
- **Gradient Backgrounds**: Beautiful animated gradient hero section
- **Interactive Cards**: Hover effects and smooth property card animations
- **Real-Time Counters**: Animated statistics showing live property data
- **Professional Styling**: Clean, modern design with consistent branding

### 🔐 User Authentication
- **Flexible Login**: Email/password and social login options (Google, Facebook, Apple)
- **User Registration**: Complete signup flow with validation
- **Session Management**: Persistent login across page navigation
- **Protected Features**: Login required for booking viewings
- **User Feedback**: Success/error messages with smooth animations

### 📱 Navigation & UX
- **Multi-Page Application**: 6 distinct pages with seamless navigation
- **Smart Routing**: Proper URL handling and page-specific content
- **Active States**: Visual indicators for current page
- **Quick Actions**: Like, shortlist, and book viewing buttons
- **Loading States**: User-friendly loading indicators and error handling

## 🏗️ Project Structure

```
EmptyCupAssignment/
├── 🔧 Backend/
│   ├── app.py                # Flask API with CORS & caching disabled
│   └── listings.json         # 6 sample properties with real data
├── 🎨 Frontend/
│   ├── index.html           # Homepage with featured properties & shortlist
│   ├── listings.html        # Complete listings with filtering
│   ├── about.html           # Company information page
│   ├── contact.html         # Contact form and details
│   ├── login.html           # Authentication with social options
│   ├── signup.html          # User registration form
│   ├── config.js            # Environment-specific API configuration
│   ├── styles.css           # Responsive CSS with animations
│   ├── script.js            # Enhanced JavaScript with debugging
│   └── netlify.toml         # Netlify deployment configuration
├── 🚀 Deployment/
│   ├── render.yaml          # Render backend deployment config
│   ├── start_server.py      # Local development server script
│   ├── run_local.py         # Alternative local server script
│   └── DEPLOYMENT_GUIDE.md  # Step-by-step deployment instructions
├── 🧪 Testing/
│   ├── test.html            # Simple API test page
│   ├── simple_test.html     # Minimal property display test
│   ├── test_api.py          # Python API testing script
│   └── check_server.py      # Server health check script
├── 📦 Configuration/
│   ├── docker-compose.yml   # Docker multi-container setup
│   ├── Dockerfile           # Container configuration
│   ├── requirements.txt     # Python dependencies with gunicorn
│   └── .gitignore           # Git ignore patterns
└── 📚 Documentation/
    ├── README.md            # This comprehensive guide
    └── DEPLOYMENT_GUIDE.md  # Detailed deployment instructions
```

## 🛠️ Technologies Used

### 🔧 Backend Stack
- **Flask 2.3.3**: Modern Python web framework with enhanced security
- **Flask-CORS 4.0.0**: Cross-Origin Resource Sharing for API access
- **Gunicorn 21.2.0**: Production WSGI server for deployment
- **Werkzeug 2.3.7**: Comprehensive WSGI web application library
- **JSON**: Structured data storage for property listings

### 🎨 Frontend Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Advanced styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modern client-side functionality
- **LocalStorage API**: Persistent client-side data storage
- **Fetch API**: Asynchronous HTTP requests with error handling
- **Font Awesome**: Professional icon library

### 🚀 Deployment & DevOps
- **Netlify**: Static site hosting with CDN and form handling
- **Render**: Cloud platform for backend API hosting
- **Docker**: Containerization for consistent environments
- **Docker Compose**: Multi-container orchestration
- **Git**: Version control with deployment hooks

### 🧪 Development Tools
- **Python 3.9+**: Modern Python runtime
- **VS Code**: Development environment with extensions
- **Browser DevTools**: Debugging and performance analysis
- **Postman/Thunder Client**: API testing and documentation

## 🚀 Quick Start

Get up and running in under 2 minutes:

```bash
# Clone the repository
git clone <repository-url>
cd EmptyCupAssignment

# Install dependencies
pip install -r requirements.txt

# Start the server
python start_server.py

# Open your browser
# Navigate to http://localhost:12001
```

## 📦 Installation Options

### 🎯 Option 1: Simple Local Setup (Recommended)

**Prerequisites**: Python 3.9+ and Git

1. **Clone and Setup**:
   ```bash
   git clone <repository-url>
   cd EmptyCupAssignment
   pip install -r requirements.txt
   ```

2. **Start Development Server**:
   ```bash
   python start_server.py
   ```

3. **Access Application**:
   - **Homepage**: http://localhost:12001
   - **API Endpoint**: http://localhost:12001/api/listings
   - **Test Page**: http://localhost:12001/simple_test.html

### 🐳 Option 2: Docker Deployment

**Prerequisites**: Docker and Docker Compose

1. **Clone and Build**:
   ```bash
   git clone <repository-url>
   cd EmptyCupAssignment
   docker-compose up --build
   ```

2. **Access Application**:
   ```
   http://localhost:12001
   ```

### ☁️ Option 3: Production Deployment

See the detailed [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for:
- **Frontend**: Netlify deployment
- **Backend**: Render deployment
- **Environment Configuration**
- **Custom Domain Setup**

## 📖 Usage Guide

### 🏠 Property Discovery

**Homepage Experience**:
- **Featured Properties**: View 3 carefully selected premium properties
- **Live Statistics**: See real-time counts of properties, cities, and agents
- **Quick Actions**: Like, shortlist, or book viewings directly from homepage
- **View All Button**: Access complete property catalog with one click

**Complete Listings**:
- **All Properties**: Browse all 6 available properties with full details
- **Advanced Filtering**: Filter by price range, bedrooms, and location
- **Smart Search**: Search across titles, locations, and descriptions
- **Flexible Sorting**: Sort by price (ascending/descending), bedrooms, or area

### ❤️ Shortlist Management

1. **Adding Properties**:
   - Click the **heart icon** on any property card
   - Properties are instantly added to your shortlist
   - Visual feedback confirms the action

2. **Managing Shortlist**:
   - View shortlisted properties on the homepage
   - Remove properties by clicking the heart icon again
   - Shortlist persists across browser sessions

3. **Cross-Page Sync**:
   - Shortlist updates are reflected on all pages instantly
   - No login required for basic shortlisting

### 🔐 User Authentication

**Login Options**:
- **Email/Password**: Use any email and password for demo
- **Social Login**: Google, Facebook, or Apple (simulated)
- **Demo Account**: test@example.com / password123

**Registration**:
- **Quick Signup**: Name, email, and password required
- **Social Registration**: One-click signup with social providers
- **Instant Access**: Immediate login after successful registration

### 🎯 Interactive Features

**Property Actions**:
- **Like Button**: Mark properties as favorites (persists locally)
- **Shortlist Button**: Add to shortlist for easy comparison
- **Book Viewing**: Schedule property visits (requires login)

**Navigation**:
- **Responsive Menu**: Works seamlessly on all devices
- **Active States**: Current page highlighted in navigation
- **Logo Navigation**: Click logo to return to homepage

## 🔌 API Documentation

### 📡 Available Endpoints

#### **GET /api/listings**
- **Description**: Retrieve all property listings
- **Parameters**: None
- **Response**: JSON array of 6 property objects
- **Status Codes**: 200 (Success), 500 (Server Error)

#### **GET /api/listings/<id>**
- **Description**: Retrieve specific property by ID
- **Parameters**: `id` (integer, 1-6)
- **Response**: JSON object with property details
- **Status Codes**: 200 (Success), 404 (Not Found), 500 (Server Error)

### 📊 Current Property Data

Our application includes 6 diverse properties:

| ID | Property | Price | Type | Location |
|----|----------|-------|------|----------|
| 1 | Modern Apartment in Downtown | $1,500 | 2 bed, 1 bath | Downtown |
| 2 | Cozy Studio near University | $900 | Studio, 1 bath | University District |
| 3 | Luxury Condo with City View | $2,800 | 3 bed, 2 bath | Hillcrest |
| 4 | Charming Cottage in Suburbs | $1,800 | 2 bed, 1.5 bath | Greenfield |
| 5 | Renovated Loft in Arts District | $2,200 | 1 bed, 1 bath | Arts District |
| 6 | Family Home with Backyard | $2,500 | 4 bed, 2.5 bath | Riverside |

### 📝 Sample API Response

```json
{
  "id": 1,
  "title": "Modern Apartment in Downtown",
  "location": "123 Main St, Downtown",
  "price": 1500,
  "bedrooms": 2,
  "bathrooms": 1,
  "area": 850,
  "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267...",
  "description": "Beautiful modern apartment in the heart of downtown with great amenities."
}
```

### 🔧 API Features

- **CORS Enabled**: Cross-origin requests supported
- **Error Handling**: Comprehensive error responses
- **Real Images**: High-quality Unsplash property photos
- **Consistent Format**: Standardized JSON response structure
- **Development Mode**: Caching disabled for easy testing

## 💻 Development

### 🔧 Backend Development

**Flask Application Structure**:
- **`app.py`**: Enhanced Flask app with CORS, caching controls, and error handling
- **`listings.json`**: Curated property data with real Unsplash images
- **Environment Detection**: Automatic production/development mode switching

**Key Features**:
- **CORS Configuration**: Enables frontend-backend communication
- **Cache Control**: Disabled for development, optimized for production
- **Error Handling**: Comprehensive try-catch blocks with meaningful responses
- **Port Configuration**: Environment-aware port binding

**Development Workflow**:
```bash
# Start development server
python start_server.py

# Test API endpoints
python check_server.py

# View server logs
# Check terminal output for request logs
```

### 🎨 Frontend Development

**Modern JavaScript Architecture**:
- **`config.js`**: Environment-specific API configuration
- **`script.js`**: Modular JavaScript with debugging and error handling
- **DOM Management**: Proper element initialization and event handling
- **State Management**: LocalStorage for persistent user data

**CSS Architecture**:
- **Responsive Design**: Mobile-first approach with breakpoints
- **CSS Grid & Flexbox**: Modern layout techniques
- **Animations**: Smooth transitions and loading states
- **Component-Based**: Reusable styles for property cards and UI elements

**Development Best Practices**:
- **Console Logging**: Comprehensive debugging information
- **Error Boundaries**: Graceful error handling and user feedback
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Accessibility**: Semantic HTML and keyboard navigation support

### 🛠️ Development Tools

**Local Development**:
```bash
# Quick server start
python start_server.py

# Alternative server start
python run_local.py

# Health check
python check_server.py

# Simple API test
open http://localhost:12001/simple_test.html
```

**Debugging**:
- **Browser DevTools**: Network tab for API calls, Console for JavaScript logs
- **Flask Debug Mode**: Automatic reloading and detailed error pages
- **Test Pages**: Multiple test endpoints for isolated debugging

## Deployment

### Production Deployment (Recommended)

This application is configured for easy deployment with:
- **Frontend**: Netlify (static hosting)
- **Backend**: Render (Flask API hosting)

See the detailed [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for step-by-step instructions.

### Quick Deployment Steps

1. **Backend on Render**:
   - Connect your GitHub repository to Render
   - Use the provided `render.yaml` configuration
   - Deploy as a web service with the start command: `gunicorn --bind 0.0.0.0:$PORT backend.app:app`

2. **Frontend on Netlify**:
   - Deploy the `frontend` folder to Netlify
   - Update the API URL in `frontend/config.js` with your Render backend URL
   - Use the provided `netlify.toml` for proper routing

### Alternative Deployment Options

The application can also be deployed to any platform that supports Docker containers:

1. **Cloud Platforms**:
   - AWS Elastic Container Service (ECS)
   - Google Cloud Run
   - Azure Container Instances
   - Heroku (with Docker support)

2. **Self-Hosted**:
   - Kubernetes cluster
   - Docker Swarm
   - Single server with Docker

## 🧪 Testing

### 🔍 Automated Testing

**Server Health Check**:
```bash
python check_server.py
# ✓ Main page is accessible
# ✓ API is working! Found 6 properties
# 🎉 Server is working correctly!
```

**API Testing**:
```bash
# Test API endpoints directly
curl http://localhost:12001/api/listings
curl http://localhost:12001/api/listings/1
```

**Browser Testing**:
- **Simple Test**: http://localhost:12001/simple_test.html
- **API Test**: http://localhost:12001/test.html
- **Main Application**: http://localhost:12001

### 🧭 Manual Testing Checklist

**✅ Core Functionality**:
- [ ] Homepage loads with 3 featured properties
- [ ] Statistics show real data (6 properties, 4 cities, 12 agents)
- [ ] Shortlist functionality works (add/remove)
- [ ] "View All Properties" button shows correct count
- [ ] All 6 properties display on listings page

**✅ User Interactions**:
- [ ] Property filtering (price, bedrooms, search)
- [ ] Property sorting (price, bedrooms, area)
- [ ] Like button toggles and persists
- [ ] Book viewing requires login
- [ ] Social login simulation works

**✅ Responsive Design**:
- [ ] Mobile layout (< 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (> 1024px)
- [ ] Navigation menu adapts to screen size

**✅ Authentication Flow**:
- [ ] Login with test@example.com / password123
- [ ] Social login options work
- [ ] User registration flow
- [ ] Logout functionality
- [ ] Session persistence

### 🎯 Demo Accounts

- **Test Account**: test@example.com / password123
- **Social Login**: Click any social provider (simulated)
- **New Registration**: Use any email/password combination

## 🔧 Troubleshooting

### 🚨 Common Issues & Solutions

**1. Properties Not Loading**:
```bash
# Check if server is running
python check_server.py

# Restart server
python start_server.py

# Check browser console for JavaScript errors
# Open DevTools → Console tab
```

**2. API Connection Issues**:
```bash
# Verify API endpoint
curl http://localhost:12001/api/listings

# Check CORS headers
# Should see: Access-Control-Allow-Origin: *
```

**3. Shortlist Not Persisting**:
- Clear browser cache and localStorage
- Check browser console for storage errors
- Ensure JavaScript is enabled

**4. Styling Issues**:
- Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
- Check if CSS file is loading in Network tab
- Verify no CSS syntax errors in console

**5. Port Already in Use**:
```bash
# Find process using port 12001
netstat -ano | findstr :12001  # Windows
lsof -i :12001                 # macOS/Linux

# Kill the process or use different port
```

### 🐛 Debug Mode

Enable detailed logging by opening browser DevTools:
- **Console Tab**: JavaScript logs and errors
- **Network Tab**: API requests and responses
- **Application Tab**: LocalStorage data inspection

## 🤝 Contributing

We welcome contributions to improve EmptyCup Property Listings! Here's how you can help:

### 🚀 Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/EmptyCupAssignment.git
   cd EmptyCupAssignment
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Add new properties to `backend/listings.json`
   - Enhance UI components in `frontend/`
   - Improve API endpoints in `backend/app.py`
   - Update documentation

4. **Test Your Changes**
   ```bash
   python check_server.py
   python start_server.py
   # Test in browser: http://localhost:12001
   ```

5. **Commit and Push**
   ```bash
   git commit -m 'Add amazing feature'
   git push origin feature/amazing-feature
   ```

6. **Submit Pull Request**
   - Describe your changes clearly
   - Include screenshots for UI changes
   - Reference any related issues

### 🎯 Contribution Ideas

- **New Property Types**: Add commercial, vacation, or luxury properties
- **Enhanced Filtering**: Location-based search, amenities filter
- **User Features**: Property comparison, saved searches, email alerts
- **UI Improvements**: Dark mode, accessibility enhancements
- **Performance**: Image optimization, lazy loading, caching
- **Testing**: Unit tests, integration tests, E2E tests

### 📋 Code Standards

- **JavaScript**: ES6+ features, consistent formatting
- **CSS**: BEM methodology, responsive design principles
- **Python**: PEP 8 compliance, type hints where applicable
- **Documentation**: Update README for new features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 📜 License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability accepted

### 🌟 Acknowledgments

- **Unsplash**: High-quality property images
- **Font Awesome**: Professional icon library
- **Flask Community**: Excellent web framework
- **Netlify & Render**: Reliable hosting platforms

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by the EmptyCup Team

[🏠 Homepage](http://localhost:12001) • [📖 Documentation](DEPLOYMENT_GUIDE.md) • [🚀 Deploy](https://netlify.com)

</div>