import requests
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings

from .workers import PointsInBuffer

class RouteMixinView(generics.RetrieveAPIView):
    permission_classes = (AllowAny, )
    
    def get(self, request):
        start, end, buffer_value, type = self.retrieve_request_param(request)
        response = requests.get(f'https://api.mapbox.com/directions/v5/mapbox/driving/{start[0]},{start[1]};{end[0]},{end[1]}?steps=true&geometries=geojson&access_token={settings.MAPBOX_ACCESS_TOKEN}&alternatives=true&overview=full')
        data = response.json()
        self.routes = data['routes']
        winner_idx = self.get_winner_route(buffer_value, type)  
        data = data['routes'][winner_idx]
        return Response(data)
    
    def retrieve_request_param(self, request):
        start = request.GET.get('start').split(',')
        end = request.GET.get('end').split(',')
        buffer_value = float(request.GET.get('buffer'))
        type = request.GET.get('type') if request.GET.get('type') != "null" else None
        return start, end, buffer_value, type
    
    def get_winner_route(self, buffer_value, type):
        winner_idx = -1
        winner_rate = -1
        for idx, route in enumerate(self.routes):
            pointsInBuffer = PointsInBuffer(route, buffer_value, type)
            route_rate = pointsInBuffer.get_route_rate()
            if route_rate > winner_rate:
                winner_idx = idx
                winner_rate = route_rate
            if route_rate == winner_rate:
                winner_duration = self.routes[winner_idx]['duration']
                route_duration = self.routes[idx]['duration']
                if route_duration > winner_duration:
                    winner_idx = idx
                    winner_rate = route_rate
        return winner_idx
    
route_get_view = RouteMixinView.as_view()