from django.urls import path

from env_data.views import EnvDataCreate, EnvDataDetail, EnvDataFilter

urlpatterns = [
    path("env-data/", EnvDataCreate.as_view(), name='env-data'),
    path("env-data/", EnvDataDetail.as_view(), name='env-data'),
    path("env-data/filter/", EnvDataFilter.as_view(), name='env-data')
]
