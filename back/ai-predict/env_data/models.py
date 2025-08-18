import uuid

from django.db import models


# Create your models here.
class EnvData(models.Model):
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ts = models.DateTimeField()
    tmp = models.FloatField()
    hum = models.FloatField()
    pco = models.FloatField()
    pf = models.FloatField()
    tco = models.FloatField()
    br = models.FloatField()
    pa = models.FloatField()
    vib = models.FloatField()
    dec = models.FloatField()
    eau = models.FloatField()

    class Meta:
        db_table = "env_data"
        managed = False

    def __str__(self):
        return self.ts
