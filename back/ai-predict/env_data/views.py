from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics

from env_data.models import EnvData
from env_data.serializers import EnvDataSerializer


# Create your views here.
class EnvDataCreate(generics.ListCreateAPIView):
    queryset = EnvData.objects.all()
    serializer_class = EnvDataSerializer

class EnvDataFilter(generics.ListAPIView):
    queryset = EnvData.objects.all()
    serializer_class = EnvDataSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'ts': ['gte', 'lte']
    }

class EnvDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = EnvData.objects.all()
    serializer_class = EnvDataSerializer
