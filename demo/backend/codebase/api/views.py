""" def get_method():
    items = {}
    for key in settings.REDIS_INSTANCE.keys('*'):
        try:
            items[key] = settings.REDIS_INSTANCE.get(key)
        except redis.exceptions.ResponseError:
            items[key] = settings.REDIS_INSTANCE.hgetall(key)
    response = {
        'POI': itemsw
    }
    return response

def post_method(request):
    serializer = POISerializer(data=request.data)
    if serializer.is_valid():
        item = serializer.data
        settings.REDIS_INSTANCE.hmset(f'POI:{item["id"]}', item)
        settings.REDIS_INSTANCE.bgsave(False)
        return item
    return {"invalid": f"{item} is invalid data"} """
