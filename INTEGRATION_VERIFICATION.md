# Backend Integration Verification

## Django Project Structure
- **Project Name**: `quickmed`
- **App Name**: `home`
- **Backend URL**: `http://localhost:8000`

## API Endpoints (Django REST Framework)

### Base URL Structure
```
http://localhost:8000/api/reviews/
```

### Available Endpoints

1. **GET /api/reviews/**
   - Fetches all approved reviews
   - Returns: Array of review objects
   - Used by: `Reviews.js` component

2. **POST /api/reviews/**
   - Creates a new review
   - Body: `{name, email, rating, comment}`
   - Returns: Created review object
   - Used by: `ReviewModal.js` component

3. **GET /api/reviews/{id}/**
   - Fetches a specific review by ID
   - Returns: Review object

## Frontend Integration (Using Fetch API)

### API Service Location
- File: `frontend-quickname/src/services/api.js`
- Uses native `fetch` API (no external dependencies)

### How It Works

1. **Fetch Reviews** (`Reviews.js`):
   ```javascript
   import { reviewsAPI } from '../../services/api';
   const data = await reviewsAPI.getAll();
   ```

2. **Submit Review** (`ReviewModal.js`):
   ```javascript
   import { reviewsAPI } from '../../services/api';
   const newReview = await reviewsAPI.create(reviewData);
   ```

## URL Routing Verification

### Django URLs Configuration

**Main URLs** (`quickmed/urls.py`):
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),  # Includes home app URLs
]
```

**Home App URLs** (`home/urls.py`):
```python
router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
urlpatterns = [
    path('api/', include(router.urls)),  # Creates /api/reviews/
]
```

**Final URL Structure**:
- `/api/reviews/` → List/Create reviews
- `/api/reviews/{id}/` → Get/Update/Delete specific review

## Data Flow

### Creating a Review

1. User fills form in `ReviewModal.js`
2. Form submits → `handleSubmit()` called
3. `reviewsAPI.create(reviewData)` → Fetch POST to `/api/reviews/`
4. Django `ReviewViewSet.create()` processes request
5. Review saved to PostgreSQL database
6. Response returned with review data (including `avatar` and `date` properties)
7. Frontend updates UI and refreshes reviews list

### Fetching Reviews

1. `Reviews.js` component mounts
2. `useEffect` calls `reviewsAPI.getAll()`
3. Fetch GET to `/api/reviews/`
4. Django `ReviewViewSet.get_queryset()` filters approved reviews
5. Returns array of review objects
6. Frontend displays reviews in UI

## Response Format

### Review Object Structure
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "comment": "Great service!",
  "status": "approved",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "avatar": "JD",
  "date": "2024-01-15"
}
```

## Testing the Integration

### 1. Start Backend
```bash
cd backend/quickmed
python manage.py runserver
```

### 2. Test API Endpoint
```bash
# Get all reviews
curl http://localhost:8000/api/reviews/

# Create a review
curl -X POST http://localhost:8000/api/reviews/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","rating":5,"comment":"Test review"}'
```

### 3. Start Frontend
```bash
cd frontend-quickname
npm start
```

### 4. Verify in Browser
- Open browser console (F12)
- Navigate to homepage
- Click "Write a Review"
- Submit a review
- Check Network tab to see fetch requests to `/api/reviews/`

## Error Handling

The fetch API includes comprehensive error handling:

1. **Network Errors**: Catches connection failures
2. **HTTP Errors**: Parses Django error responses
3. **Validation Errors**: Handles field-specific errors from DRF
4. **Fallback**: Uses localStorage if API unavailable

## CORS Configuration

CORS is configured in `quickmed/settings.py`:
```python
CORS_ALLOW_ALL_ORIGINS = True  # Development only
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
]
```

## Database Integration

- **Model**: `home.models.Review`
- **Database**: PostgreSQL (`quickmed_db`)
- **Table**: `home_review`
- **Admin**: Accessible at `http://localhost:8000/admin/`

## Verification Checklist

- ✅ Django project name: `quickmed`
- ✅ Django app name: `home`
- ✅ Using `fetch` API (no axios/other libraries)
- ✅ API endpoints correctly routed
- ✅ CORS configured
- ✅ Error handling implemented
- ✅ Data format matches between frontend/backend
- ✅ Reviews saved to PostgreSQL database
- ✅ Reviews displayed in frontend

