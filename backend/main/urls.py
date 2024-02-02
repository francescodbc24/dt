from django.urls import path
from main.request.views import get_by_code,get,post,get_csfr

urlpatterns = [
    path('http/',get,name="get_all_request"),
    path('http/<str:method>/',post,name="analyse_request"),
    path('shared/<str:code>/',get_by_code,name="get_by_code"),
    path('csrf/',get_csfr, name='csfr')
]
