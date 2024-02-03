from rest_framework.views import APIView
from rest_framework.response import Response
from main.models import RequestHTTP,ResponseHTTP
from .serializer import RequestHTTPResponseSerializer
from typing import List
from urllib.parse import urlparse
from main.services.url_service import url_service
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from http import HTTPMethod
from rest_framework.decorators import api_view,permission_classes
from django.shortcuts import get_object_or_404
from main.utils.response import Ok,BadRequest,NotFound,InternalServerError
import sys
import random
import string

def generate_unique_code(length:int):
    alphanumeric_chars = string.ascii_uppercase + '0123456789'
    code = ''.join(random.choice(alphanumeric_chars) for _ in range(length))
    return code

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csfr(request):
    return Ok('CSRF Cookie set')

@api_view(['GET'])
def get(request):
    try:
        data=[]
        data=__get_entity()
        serializer=RequestHTTPResponseSerializer(data,many=True)
        return Ok(serializer.data)   
    except Exception:
        return InternalServerError(message='error' + str(sys.exc_info()[0]) + ' --- ' + str(sys.exc_info()[1]))

@api_view(['GET'])
def get_by_code(request,code):
    try:
        data=__get_entity_by_id(code)
        if data is None:
             return NotFound("Shared code not found")
        serializer=RequestHTTPResponseSerializer(data,many=False)
        return Ok(serializer.data)
    except Exception:
        return InternalServerError('error' + str(sys.exc_info()[0]) + ' --- ' + str(sys.exc_info()[1]))
      
@api_view(['POST'])
@csrf_protect
def post(request,method):
    # set method to request data dict to be validate
    data=request.data.copy()
    data["method"]=method
    serializer=RequestHTTPResponseSerializer(data=data)
    serializer.is_valid()
    try:
        url = data["url"]
        method=data["method"]
        request,responses=url_service.analyze_url(url,method)

        entity= RequestHTTP(domain=request.domain,
                                url=url,
                                scheme=request.scheme,
                                path=request.path,
                                method=method,
                                status_code=request.status_code,
                                share=generate_unique_code(10),
                                page_load=request.page_load,
                                first_iteration=request.first_iteration)

        bulk_data:List[ResponseHTTP]=[]
        for item in responses:
                obj=ResponseHTTP(request=entity,status_code=item.code,
                                 server=item.server,
                                 location=item.location,
                                 date=item.date,
                                 reason=item.reason,
                                 http_version=item.http_version,
                                 time=item.time)
                bulk_data.append(obj)

        entity.save()
        result=ResponseHTTP.objects.bulk_create(bulk_data)
        serializer=RequestHTTPResponseSerializer(entity,many=False)
        return Ok(serializer.data)
    except:
        return InternalServerError('error' + str(sys.exc_info()[0]) + ' --- ' + str(sys.exc_info()[1]))

#region db

def __get_entity() -> List[RequestHTTP]:
        query_set=RequestHTTP.objects.prefetch_related("responses")
        data=list(query_set)
        return data

def __get_entity_by_id(code:str) -> List[RequestHTTP]:
        try:
            data=RequestHTTP.objects.prefetch_related("responses").get(share=code)
            return data
        except:
            return None
        

#endregion

