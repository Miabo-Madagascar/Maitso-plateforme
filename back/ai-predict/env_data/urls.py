from django.urls import path

from env_data.views import EnvDataCreate, EnvDataDetail, EnvDataFilter

urlpatterns = [
    path("env-data/", EnvDataCreate.as_view(), name='env-data'),
    path("env-data/filter/", EnvDataFilter.as_view(), name='env-data-filter'),
    path("env-data/<uuid:pk>/", EnvDataDetail.as_view(), name='env-data-detail')
]
