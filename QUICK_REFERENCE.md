# Quick Reference - Reviews Backend Integration

## ✅ Configuration Summary

- **Django Project**: `quickmed`
- **Django App**: `home`
- **Backend URL**: `http://localhost:8000`
- **API Method**: Native `fetch` API (no dependencies)
- **Database**: PostgreSQL

## 🔗 API Endpoints

```
GET    /api/reviews/          → Get all approved reviews
POST   /api/reviews/          → Create new review
GET    /api/reviews/{id}/     → Get specific review
```

## 📁 Key Files

### Backend (Django)
```
backend/quickmed/
├── home/
│   ├── models.py          # Review model
│   ├── views.py           # ReviewViewSet (API)
│   ├── serializers.py     # ReviewSerializer
│   ├── urls.py            # API routes (/api/reviews/)
│   └── admin.py           # Admin interface
└── quickmed/
    ├── settings.py        # Database & CORS config
    └── urls.py            # Main routing
```

### Frontend (React)
```
frontend-quickname/src/
├── services/
│   └── api.js             # Fetch API service
└── components/Homepage/
    ├── Reviews.js         # Fetches reviews via fetch
    └── ReviewModal.js     # Submits reviews via fetch
```

## 🚀 Quick Start

### 1. Backend
```bash
cd backend/quickmed
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Frontend
```bash
cd frontend-quickname
npm start
```

### 3. Test
- Open http://localhost:3000
- Click "Write a Review"
- Submit a review
- Check http://localhost:8000/admin/ to see it in database

## 📝 Fetch API Usage

### Get Reviews
```javascript
import { reviewsAPI } from '../../services/api';
const reviews = await reviewsAPI.getAll();
```

### Create Review
```javascript
import { reviewsAPI } from '../../services/api';
const review = await reviewsAPI.create({
  name: "John Doe",
  email: "john@example.com",
  rating: 5,
  comment: "Great service!"
});
```

## 🔍 Verify Integration

1. Check browser console for fetch requests
2. Check Network tab → see requests to `http://localhost:8000/api/reviews/`
3. Check Django admin → see reviews in database
4. Check PostgreSQL → query `SELECT * FROM home_review;`

## ⚙️ Environment Variables

Create `.env` in `frontend-quickname/`:
```
REACT_APP_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

**CORS Error?**
- Check `CORS_ALLOW_ALL_ORIGINS = True` in settings.py

**Connection Error?**
- Verify backend is running on port 8000
- Check `API_BASE_URL` in `api.js`

**404 Error?**
- Verify URL routing: `quickmed/urls.py` → `home/urls.py`
- Check Django server logs

