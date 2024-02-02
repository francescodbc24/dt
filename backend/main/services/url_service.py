import httpx
from httpx import Response as HttpxResponse,Headers
from typing import List
from urllib.parse import urlparse
from urllib.request import urlopen 
from time import time 
from main.utils.validation import valid_url
from datetime import datetime
from typing import Tuple

from pydantic import BaseModel
from typing import List, Optional

class Request(BaseModel):
    domain: Optional[str] = None
    status_code: Optional[int] = None
    scheme: Optional[str] =None
    path: Optional[str] = None
    page_load: float = 0
    first_iteration: float = 0

class Response(BaseModel):
    reason: Optional[str] = None
    code: Optional[int] =None
    time: Optional[float] = None
    http_version:  Optional[str] = None
    server:  Optional[str] = None
    date:  Optional[str] = None
    location:  Optional[str] = None

class Metrics(BaseModel):
    page_load: float = 0
    first_iteration: float = 0

class UrlService():
    #TODO valid url??
    def analyze_url(self,url:str,method:str)->Tuple[Request, List[Response]]:
        if url is None:
            raise ValueError()
        if not isinstance(url,str):
            raise ValueError()
        
        request:Request=Request()
        responses:List[Response] = []
        metrics:Metrics=Metrics()

        response_get:HttpxResponse = httpx.request(method=method,url=url,follow_redirects=True)

        request.domain=response_get.request.url.host
        request.scheme=response_get.request.url.scheme
        request.path=response_get.request.url.path
        request.status_code=response_get.status_code

        response=Response(reason=response_get.reason_phrase,
                 code=response_get.status_code,
                 time=response_get.elapsed.total_seconds(),
                 http_version=response_get.http_version,
                 server=self.__get_header(response_get.headers,"server"),
                 date=self.__get_header(response_get.headers,"date"),
                 location=self.__get_header(response_get.headers,"location"))
        responses.append(response)

        for history in response_get.history:
            response=Response(reason=history.reason_phrase,
                                code=history.status_code,
                                time=history.elapsed.total_seconds(),
                                http_version=history.http_version,
                                date=self.__get_header(response_get.headers,"date"),
                                server=self.__get_header(history.headers,"server"),
                                location=self.__get_header(history.headers,"location"))
            responses.append(response)
        if method == "GET":
            metrics:Metrics=self.__page_speed(url)

        request.page_load=metrics.page_load
        request.first_iteration=metrics.first_iteration

        return request,responses
    
    def __page_speed(self,url:str):
        metrics:Metrics= Metrics()
        base_url = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={}&strategy=mobile"
        # full url
        full_url = base_url.format(url)
        response = httpx.get(full_url,timeout=60)
        data=response.json()
        if not response.is_error and data is not None:
            first_content_paint=data['lighthouseResult']['audits']['first-contentful-paint']
            speed_infex=data['lighthouseResult']['audits']['speed-index'],
            first_iteration=data["lighthouseResult"]["audits"]['interactive'] # . display value can be
      
            metrics.page_load =first_content_paint['numericValue'] / 1000 
            metrics.first_iteration=first_iteration['numericValue'] / 1000
        
        return metrics
    
    def __get_header(self,headers:Headers, header_key:str)->str:
        if header_key in headers:
            return headers[header_key]
        else:
            return ""
    
    
url_service = UrlService()