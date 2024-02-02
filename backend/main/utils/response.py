from rest_framework.response import Response

class Ok(Response):
    def __init__(self, data=None):
        model_response={
            "status":200,
            "error":None,
            "data":data
        }
        super().__init__(data=model_response, status=200)


class Created(Response):
    def __init__(self, data=None):
        model_response={
            "status":201,
            "error":None,
            "data":data
        }
        super().__init__(data=model_response, status=201)


class BadRequest(Response):
    def __init__(self, data=None):
        model_response={
            "status":400,
            "error":data,
            "data":None
        }
        super().__init__(data=model_response, status=400)


class NotFound(Response):
    def __init__(self, data=None):
        model_response={
            "status":404,
            "error":data,
            "data":None
        }
        super().__init__(data=model_response, status=404)

class InternalServerError(Response):
    def __init__(self, data=None):
        model_response={
            "status":500,
            "error":data,
            "data":None
        }
        super().__init__(data=model_response, status=500)