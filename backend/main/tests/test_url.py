from main.services.url_service import url_service
import pytest


class TestUnit:

    @pytest.mark.parametrize(
    "url",
    [None,123123,"ggggg","lll"])
    def test_url_with_wrong_args_expect_ValueError(self,url:str):
        with pytest.raises(ValueError):
            url_service.analyze_url(url,"OPTIONS")

class TestIntegration:
    @pytest.mark.parametrize(
    "url",
    ["https://google.com","http://google.com"])
    def test_url_analyze_with_valid_url(self,url:str):
        result=url_service.analyze_url(url,"GET")
        assert len(result) >= 1