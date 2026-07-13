# Elite Founder Hub

A comprehensive fullstack platform connecting startup founders with resources, mentorship, and a vibrant community of innovators.

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Founder Network**: Browse and connect with other founders in the ecosystem
- **Resource Library**: Access and share curated resources including funding tips, tools, and learning materials
- **User Dashboard**: Personalized dashboard for managing profiles and tracking activity
- **Resource Management**: Add, upvote, and categorize resources across multiple topics

## Tech Stack

### Frontend
- **React 18** - User interface framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and responsive design

### Backend
- **Node.js & Express** - Server and API framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Secure password hashing

## Project Structure

```
elite-founder-hub/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Resource.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── founders.js
│   │   └── resources.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Founders.js
│   │   │   └── Resources.js
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Founders.css
│   │   │   └── Resources.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally or Atlas connection)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd elite-founder-hub
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and update:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure secret key for JWT signing
- `PORT`: Server port (default: 5000)

4. **Start MongoDB** (if running locally)
```bash
mongod
```

5. **Run the development server**
```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Founders
- `GET /api/founders` - Get all founders
- `GET /api/founders/:id` - Get specific founder
- `PUT /api/founders/:id` - Update founder profile (requires token)

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources?category=<category>` - Filter by category
- `POST /api/resources` - Create new resource (requires token)
- `PUT /api/resources/:id/upvote` - Upvote a resource (requires token)
- `DELETE /api/resources/:id` - Delete resource (requires token)

## Resource Categories

- **funding** - Information about funding sources and investors
- **mentorship** - Mentoring and networking opportunities
- **tools** - Useful tools and software for startups
- **learning** - Educational materials and courses
- **events** - Upcoming events and conferences

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Building for Production

### Frontend
```bash
cd client
npm run build
```

### Backend
Simply set `NODE_ENV=production` in your `.env` file and ensure all dependencies are installed.

## Future Enhancements

- Direct messaging between founders
- Advanced founder search and filtering
- Resource reviews and ratings
- Event calendar and RSVP functionality
- User notifications
- Social media integration
- Analytics dashboard
- Export functionality

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ for the startup ecosystem
