from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet, reviews_portal
from .auth_views import signup, login
from .profile_views import get_profile, update_profile, get_doctors

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/signup/', signup, name='signup'),
    path('api/auth/login/', login, name='login'),
    path('api/profile/', get_profile, name='get_profile'),
    path('api/profile/update/', update_profile, name='update_profile'),
    path('api/doctors/', get_doctors, name='get_doctors'),
    path('portal/', reviews_portal, name='reviews_portal'),
]

