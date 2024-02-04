from rest_framework.test import APIClient
from rest_framework import status
from main.services.url_service import url_service
import pytest

class TestUnit:
    @pytest.mark.parametrize(
    "data",
    [None,{"url2":"wrong"}])
    def test_analyse_with_wrong_body_returns_400(self,client:APIClient,data):
        response =client.post("/api/http/GET/",data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    @pytest.mark.parametrize(
    "method",
    ["POS!!","GGG"," "])
    def test_analyse_with_wrong_methods_return_400(self,client:APIClient,method):
        response =client.post("/api/http/"+method+"/",None)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    @pytest.mark.parametrize(
    "url",
    ["www","google",".com",""])
    def test_analyse_with_wrong_url_return_400(self,client:APIClient,url):
        response =client.post("/api/http/POST/",{"url":url})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    
@pytest.mark.django_db
class TestIntegration:
    def test_get_all_request_return_200(self,client:APIClient):
        response =client.get("/api/http/")
        assert response.status_code == status.HTTP_200_OK

    def test_analyse_with_valid_url_returns_200(self,client:APIClient):
            response =client.post("/api/http/GET/",{"url":"http://www.google.com"})
            assert response.status_code == status.HTTP_200_OK

    def test_analyse_with_url_with_redirect_expect_tworesponses(self,client:APIClient):
            response =client.post("/api/http/GET/",{"url":"http://google.com"})
            assert response.status_code == status.HTTP_200_OK
            assert len(response.data['data']['responses']) >=2 
            
    @pytest.mark.parametrize(
    "code",
    ["aa","bb","cc"])
    def test_get_by_code_request_return_404(self,client,code):
        response =client.get("/api/shared/"+code+"/")
        assert response.status_code == status.HTTP_404_NOT_FOUND

