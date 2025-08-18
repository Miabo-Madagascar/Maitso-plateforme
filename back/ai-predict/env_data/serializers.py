from datetime import datetime

from rest_framework import serializers

from .models import EnvData


class EnvDataSerializer(serializers.ModelSerializer):
    ts = serializers.IntegerField(write_only=True)

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        timestamp_num = str(data.get('ts'))

        if len(timestamp_num) == 12:
            dt = datetime.strptime(timestamp_num, "%y%m%d%H%M%S")
            internal_data['ts'] = dt
        else:
            raise serializers.ValidationError({"message": "The timestamp (ts) formatted as YYMMDDHHMMSS (12 digits)."})

        return internal_data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['ts'] = instance.ts.isoformat()
        return representation

    class Meta:
        model = EnvData
        fields = '__all__'
