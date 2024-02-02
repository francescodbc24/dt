from rest_framework.views import exception_handler
from rest_framework.exceptions import Throttled
from rest_framework.serializers import ValidationError
def custom_exception_handler(exc, context):
    # get the standard error response.
    response = exception_handler(exc, context)

    if isinstance(exc, Throttled): # check Throttled exception 
        custom_error = { 
            'error': 'request limit exceeded %d seconds'%exc.wait,
        }
        response.data = custom_error 
    if isinstance(exc, ValidationError): 
        custom_error = { 
            'error': exc.args[0],
        }
        response.data = custom_error

    return response