# QuickMed Reviews Feature - Setup Guide

## Overview

The reviews feature has been fully integrated with backend database support. When users write reviews, they are now:
1. ✅ Saved to PostgreSQL database
2. ✅ Displayed in the frontend
3. ✅ Accessible via REST API

## What Was Implemented

### Backend (Django)
- ✅ Review model with all necessary fields (name, email, rating, comment, status)
- ✅ Django REST Framework API endpoints
- ✅ PostgreSQL database configuration
- ✅ Admin interface for managing reviews
- ✅ CORS configuration for frontend communication

### Frontend (React)
- ✅ API service for communicating with backend
- ✅ Updated Reviews.js to fetch from API
- ✅ Updated ReviewModal.js to submit to API
- ✅ Error handling and loading states

### Database
- ✅ Complete PostgreSQL schema SQL file
- ✅ Database setup documentation

## Quick Start

### 1. Backend Setup

```bash
cd backend/quickmed

# Install dependencies
pip install -r requirements.txt

# Set up PostgreSQL database (see README_DATABASE.md for details)
# Or use SQLite for quick testing by uncommenting SQLite config in settings.py

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/reviews/`

### 2. Frontend Setup

```bash
cd frontend-quickname

# Install dependencies (if not already done)
npm install

# Set API URL (optional - defaults to http://localhost:8000)
# Create .env file with:
# REACT_APP_API_URL=http://localhost:8000

# Start development server
npm start
```

### 3. Database Configuration

Update `backend/quickmed/quickmed/settings.py` with your PostgreSQL credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'quickmed_db',
        'USER': 'postgres',  # Your PostgreSQL username
        'PASSWORD': 'your_password',  # Your PostgreSQL password
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

See `backend/quickmed/README_DATABASE.md` for detailed database setup instructions.

## API Endpoints

- **GET** `/api/reviews/` - Get all approved reviews
- **POST** `/api/reviews/` - Create a new review
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "comment": "Great service!"
  }
  ```
- **GET** `/api/reviews/{id}/` - Get a specific review
- **PATCH** `/api/reviews/{id}/approve/` - Approve a review (admin)
- **PATCH** `/api/reviews/{id}/reject/` - Reject a review (admin)

## Testing the Feature

1. Start both backend and frontend servers
2. Navigate to the homepage
3. Click "Write a Review" button
4. Fill in the form and submit
5. The review should appear immediately in the reviews section
6. Check Django admin at `http://localhost:8000/admin/` to see the review in the database

## File Structure

```
backend/quickmed/
├── home/
│   ├── models.py          # Review model
│   ├── serializers.py     # API serializers
│   ├── views.py           # API views
│   ├── urls.py            # API routes
│   └── admin.py           # Admin configuration
├── quickmed/
│   ├── settings.py        # Database & CORS config
│   └── urls.py            # Main URL routing
├── database_schema.sql    # PostgreSQL schema
├── README_DATABASE.md     # Database setup guide
└── requirements.txt       # Python dependencies

frontend-quickname/src/
├── services/
│   └── api.js             # API service functions
└── components/Homepage/
    ├── Reviews.js         # Reviews display component
    └── ReviewModal.js     # Review form component
```

## Troubleshooting

### Backend Issues

**Database connection error:**
- Ensure PostgreSQL is running
- Check credentials in settings.py
- Verify database exists: `psql -U postgres -l`

**CORS errors:**
- CORS is configured to allow all origins in development
- For production, update `CORS_ALLOWED_ORIGINS` in settings.py

### Frontend Issues

**API connection error:**
- Ensure backend server is running on port 8000
- Check browser console for errors
- Verify API_BASE_URL in `src/services/api.js`

**Reviews not loading:**
- Check network tab in browser dev tools
- Verify API endpoint is accessible: `http://localhost:8000/api/reviews/`
- Check backend logs for errors

## Next Steps

1. Set up PostgreSQL database (see README_DATABASE.md)
2. Run migrations to create tables
3. Test the review submission flow
4. Configure production settings (environment variables, security, etc.)

## Notes

- Reviews are automatically set to 'approved' status when created
- The frontend falls back to localStorage if API is unavailable
- All reviews are publicly visible (only approved ones are shown)
- Admin can manage reviews through Django admin interface

