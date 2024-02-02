import re

def valid_url(url:str):
    #url="asdasd"
    pattern=re.compile(r"/^(http|https):\/\/((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})(:\d{4})?$/")
    x = re.match(pattern, url)
    return x