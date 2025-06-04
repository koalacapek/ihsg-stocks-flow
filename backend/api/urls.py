from django.urls import path
from .views import load_csvs_by_year, get_total_net_flow, get_stocks_code, get_yearly_data

urlpatterns = [
    path('year/<int:year>/', load_csvs_by_year),
    path('total/<int:year>/<str:id>', get_total_net_flow),
    path('stocks/', get_stocks_code),
    path('yearly/<int:year>/<str:id>', get_yearly_data)
]