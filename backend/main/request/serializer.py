from rest_framework import serializers
from main.models import RequestHTTP,ResponseHTTP
from main.utils.response import Ok,BadRequest,NotFound


class ResponseHTTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponseHTTP
        fields= [
            'status_code',
            'server',
            'date',
            'time',
            'location',
            'reason',
            'http_version'
        ]

class RequestHTTPResponseSerializer(serializers.ModelSerializer):
    responses=ResponseHTTPSerializer(many=True)
    class Meta:
        model = RequestHTTP
        extra_kwargs = {
            'url': {'write_only': False},
            'method': {'write_only': False},
            'domain': {'required': False},
            'scheme': {'required': False},
            'path': {'required': False},
            'responses': {'required': False},
            }
        fields= [
            'id',
            'status_code',
            'share',
            'url',
            'method',
            'domain',
            'scheme',
            'path',
            'page_load',
            'first_iteration',
            'responses',
            
        ]
    
    def is_valid(self,raise_exception: bool = False):
        METHODS=['GET', 'POST', 'PUT', 'DELETE', 'HEAD',"PATCH", 'OPTIONS']
        if self.initial_data is None:
            raise serializers.ValidationError("data is expected as dict()")
        if 'url' not in self.initial_data:
            raise serializers.ValidationError("url is required")
        if self.initial_data['url'] is None:
            raise serializers.ValidationError("url cant be empty")
        if 'method' not in self.initial_data:
            raise serializers.ValidationError("method is required")
        if self.initial_data['method'] is None:
            raise serializers.ValidationError("method can't be empty")
        if self.initial_data['method'].upper() not in METHODS:
            raise serializers.ValidationError("Method is not valid the options are:"+ " ".join(METHODS))
        
        self.initial_data['method'] = self.initial_data['method'].upper()
        return self.initial_data
