from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('portfolio/<str:category>/', views.portfolio_detail, name='portfolio_detail'),
]