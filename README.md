# 🎈 Children's Charity Donations Website

A modern, full-stack web application for children's charities to accept donations, communicate with supporters, and share media content.

## ✨ Features

- 💰 **Donation System** - Secure donation processing with multiple payment options
- 💬 **Real-time Chat** - Live communication between admin and users
- 🖼️ **Media Gallery** - Share pictures and videos of your charity work
- 💡 **Tips & Suggestions** - Community engagement and feedback
- 👤 **User Authentication** - Secure registration and login
- 📊 **Admin Dashboard** - Manage donations, messages, and content
- 📱 **Responsive Design** - Beautiful on all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Socket.io-client for real-time features
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- Socket.io for real-time communication
- JWT authentication

### DevOps
- Docker & Docker Compose
- Environment-based configuration

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
docker-compose up --build
```

### Manual Setup

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 📖 Project Structure

```
childrens-charity-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
└── docker-compose.yml
```

## 🌐 Access Points

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432

## 📝 Environment Configuration

See `.env.example` files in backend and frontend directories for required environment variables.

## 🔐 Security Features

- JWT-based authentication
- Password hashing
- Input validation
- CORS protection
- SQL injection prevention

## 📱 Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create new donation
- `GET /api/donations/:id` - Get donation details

### Chat
- `GET /api/chat/messages` - Get messages
- `POST /api/chat/messages` - Send message
- Real-time events via Socket.io

### Media
- `GET /api/media` - Get all media
- `POST /api/media` - Upload media
- `GET /api/media/:id` - Get media details

### Tips & Suggestions
- `GET /api/tips` - Get all tips
- `POST /api/tips` - Submit tip/suggestion

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile app
- [ ] Multi-language support

---

Made with ❤️ for children's charities
