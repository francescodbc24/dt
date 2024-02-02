from django.db import models

class Base(models.Model):
    id=models.AutoField(primary_key=True)
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
    class Meta:
        abstract=True

class RequestHTTP(Base):
    url=models.TextField()
    share=models.CharField(unique=True,max_length=20)
    method = models.CharField(max_length=10)
    domain = models.TextField()
    scheme = models.TextField()
    path = models.TextField()
    page_load = models.FloatField()
    first_iteration = models.FloatField()
    class Meta:
        db_table = "request_http"

class ResponseHTTP(Base):
    code = models.IntegerField()
    server = models.TextField()
    location = models.TextField(blank=True)
    time = models.FloatField()
    reason = models.TextField()
    http_version = models.TextField()
    request=models.ForeignKey(RequestHTTP,on_delete=models.CASCADE,
                              to_field="id",db_column="request_id",related_name="responses")
    class Meta:
        db_table = "response_http"