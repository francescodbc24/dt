from django.http import JsonResponse
def custom404(request, exception=None):
    return JsonResponse({
        'error': 'The resource was not found'
    })