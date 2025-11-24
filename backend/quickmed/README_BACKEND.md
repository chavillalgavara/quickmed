# QuickMed Backend - Complete Setup

## ✅ Backend is Now Running!

The Django backend server has been set up and should be running on **http://localhost:8000**

## 🎯 Access Your Backend Portals

### 1. **Custom Backend Portal** (Recommended)
👉 **http://localhost:8000/portal/**

Beautiful dashboard with:
- Review statistics
- Recent reviews display
- Quick action buttons
- Real-time data

### 2. **Django Admin Panel**
👉 **http://localhost:8000/admin/**

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

Full admin interface for managing:
- Reviews (CRUD operations)
- Users
- Database records

### 3. **REST API**
👉 **http://localhost:8000/api/reviews/**

API endpoints for:
- GET `/api/reviews/` - List all approved reviews
- POST `/api/reviews/` - Create new review
- GET `/api/reviews/{id}/` - Get specific review

## 📋 What Was Set Up

✅ **Database**: SQLite (ready to use, easy to switch to PostgreSQL)
✅ **Migrations**: Created and applied
✅ **Admin User**: Created (admin/admin123)
✅ **API Endpoints**: Configured and working
✅ **Backend Portal**: Custom dashboard created
✅ **CORS**: Configured for frontend integration

## 🚀 Quick Commands

### Start Server
```bash
cd backend/quickmed
python manage.py runserver
```

### Or Use Startup Scripts
- **Windows**: `start_backend.bat`
- **Linux/Mac**: `./start_backend.sh`

### Create More Admin Users
```bash
python manage.py createsuperuser
```

### View API Data
- Browser: http://localhost:8000/api/reviews/
- JSON Format: http://localhost:8000/api/reviews/?format=json

## 🔗 Integration with Frontend

The backend is fully integrated with your React frontend:

1. **Frontend** (port 3000) → **Backend** (port 8000)
2. Uses `fetch` API for all requests
3. CORS configured to allow frontend access
4. Reviews automatically saved to database

## 📊 Test the Integration

1. **Open Backend Portal**: http://localhost:8000/portal/
2. **Open Frontend**: http://localhost:3000
3. **Submit a Review** from frontend
4. **See it appear** in backend portal immediately!

## 🛠️ File Structure

```
backend/quickmed/
├── home/
│   ├── models.py              # Review model
│   ├── views.py               # API + Portal views
│   ├── serializers.py         # API serializers
│   ├── urls.py                # URL routing
│   ├── admin.py               # Admin config
│   └── templates/admin/
│       └── reviews_portal.html # Backend portal UI
├── quickmed/
│   ├── settings.py            # Django settings
│   └── urls.py                # Main URLs
├── start_backend.bat          # Windows startup
├── start_backend.sh           # Linux/Mac startup
├── run_backend.py             # Python startup script
└── db.sqlite3                 # Database (created after migrations)
```

## 🎨 Backend Portal Features

The custom portal at `/portal/` includes:

- **Live Statistics**: Total, approved, pending reviews, average rating
- **Recent Reviews**: Last 10 reviews with full details
- **Quick Actions**: Links to admin, API, JSON view
- **Auto-Refresh**: Updates every 30 seconds
- **Beautiful UI**: Modern, responsive design

## 🔄 Next Steps

1. ✅ Backend is running
2. ✅ Database is set up
3. ✅ Admin user created
4. ✅ Portal is accessible
5. 🎯 Start your frontend and test the integration!

## 📝 Notes

- **Database**: Using SQLite for easy setup (can switch to PostgreSQL)
- **Admin User**: Default credentials are for development only
- **CORS**: Configured to allow all origins in development
- **Port**: Server runs on port 8000 (change if needed)

## 🆘 Troubleshooting

**Server not starting?**
- Check if port 8000 is available
- Verify Python and Django are installed
- Run: `pip install -r requirements.txt`

**Can't access portal?**
- Verify server is running: http://localhost:8000
- Check browser console for errors
- Verify migrations are applied: `python manage.py migrate`

**API not working?**
- Check CORS settings in `settings.py`
- Verify API endpoint: http://localhost:8000/api/reviews/
- Check Django server logs

---

**🎉 Your backend is ready! Access it at http://localhost:8000/portal/**

