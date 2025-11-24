# QuickMed Backend Portal Guide

## 🚀 Quick Start

### Option 1: Use Startup Script (Recommended)

**Windows:**
```bash
cd backend/quickmed
start_backend.bat
```

**Linux/Mac:**
```bash
cd backend/quickmed
chmod +x start_backend.sh
./start_backend.sh
```

### Option 2: Manual Setup

```bash
cd backend/quickmed

# Install dependencies
pip install -r requirements.txt

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

## 🌐 Access Points

Once the server is running, you can access:

### 1. **Backend Portal** (Custom Dashboard)
- **URL**: http://localhost:8000/portal/
- **Features**: 
  - View review statistics
  - See recent reviews
  - Quick access to admin and API
  - Real-time data refresh

### 2. **Django Admin Panel**
- **URL**: http://localhost:8000/admin/
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`
- **Features**:
  - Full CRUD operations on reviews
  - User management
  - Database administration

### 3. **REST API Endpoints**
- **List Reviews**: http://localhost:8000/api/reviews/
- **Create Review**: POST to http://localhost:8000/api/reviews/
- **Get Review**: http://localhost:8000/api/reviews/{id}/
- **API Docs**: http://localhost:8000/api/reviews/?format=json

## 📊 Backend Portal Features

The custom backend portal (`/portal/`) provides:

1. **Statistics Dashboard**
   - Total reviews count
   - Approved reviews count
   - Pending reviews count
   - Average rating

2. **Quick Actions**
   - Direct links to Django Admin
   - API endpoint access
   - JSON data view
   - Refresh button

3. **Recent Reviews List**
   - Last 10 reviews
   - Review details (name, email, comment)
   - Rating display
   - Status badges
   - Auto-refresh every 30 seconds

## 🔧 Configuration

### Database

The backend is configured to use **SQLite** by default (for easy setup).

To switch to PostgreSQL, edit `quickmed/settings.py`:

```python
# Comment out SQLite config
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# Uncomment PostgreSQL config
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'quickmed_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### CORS Settings

CORS is configured to allow requests from:
- `http://localhost:3000` (React dev server)
- All origins in development mode

## 📝 API Usage Examples

### Get All Reviews
```bash
curl http://localhost:8000/api/reviews/
```

### Create a Review
```bash
curl -X POST http://localhost:8000/api/reviews/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "comment": "Great service!"
  }'
```

### Get Reviews by Status
```bash
# Get all reviews (including pending/rejected)
curl http://localhost:8000/api/reviews/?status=

# Get only pending reviews
curl http://localhost:8000/api/reviews/?status=pending
```

## 🛠️ Troubleshooting

### Port Already in Use
If port 8000 is busy:
```bash
python manage.py runserver 8001
```

### Migration Errors
```bash
python manage.py makemigrations --empty home
python manage.py migrate
```

### Admin User Issues
```bash
python manage.py createsuperuser
```

### Database Locked (SQLite)
- Stop all Django processes
- Delete `db.sqlite3` and run migrations again

## 📁 Project Structure

```
backend/quickmed/
├── home/
│   ├── models.py          # Review model
│   ├── views.py           # API views + portal view
│   ├── serializers.py     # API serializers
│   ├── urls.py            # URL routing
│   ├── admin.py           # Admin configuration
│   └── templates/
│       └── admin/
│           └── reviews_portal.html  # Backend portal
├── quickmed/
│   ├── settings.py        # Django settings
│   └── urls.py            # Main URL config
├── start_backend.bat      # Windows startup script
├── start_backend.sh       # Linux/Mac startup script
└── requirements.txt       # Python dependencies
```

## 🔐 Security Notes

**For Development:**
- Default admin credentials are for development only
- Change password in production
- CORS allows all origins (restrict in production)

**For Production:**
1. Change `SECRET_KEY` in settings.py
2. Set `DEBUG = False`
3. Configure proper CORS origins
4. Use PostgreSQL database
5. Set up proper authentication
6. Use environment variables for sensitive data

## 📞 Support

If you encounter issues:
1. Check Django server logs
2. Verify database migrations are applied
3. Check browser console for API errors
4. Verify CORS settings match your frontend URL

