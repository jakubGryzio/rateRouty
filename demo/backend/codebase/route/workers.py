from shapely.geometry import LineString, mapping, Point
from poi.models import POI
from poi.serializers import POISerializer

class Buffer:
    def __init__(self, route):
        self.route = route
    
    def get_buffer(self, value):
        linestring = LineString(self.route['geometry']['coordinates'])
        return linestring.buffer((value/111))
        
    def get_buffer_json(self, value):
        buffer = self.get_buffer(value)
        return {"buffer": {"geometry": mapping(buffer)}}
    
class PointsInBuffer:
    def __init__(self, route, value, filter = None):
        self.route = route
        self.buffer = Buffer(route).get_buffer(value)
        self.poi = POI.objects.all()
        if filter:
            self.poi = POI.objects.filter(type=filter)
        
    def __is_point_in_buffer(self, point, polygon):
        return polygon.contains(point)
    
    def convert_to_Point(self, attributes):
        id = attributes[0]
        coords = attributes[1]
        return (id, Point(float(coords.split(', ')[0]), float(coords.split(', ')[1])))
    
    def get_point_objects(self):
        attributes = ('id', 'location')
        points_location_attributes = list(self.poi.values_list(*attributes))
        return [self.convert_to_Point(attributes) for attributes in points_location_attributes]
    
    def get_point_in_buffer(self, points_objects):
        return [point for point in points_objects if self.__is_point_in_buffer(point[1], self.buffer)]
    
    def get_id_point_in_buffer(self, points_objects):
        points_in_buffer = self.get_point_in_buffer(points_objects)
        return [point[0] for point in points_in_buffer]
    
    def get_serialize_poi_in_buffer(self, id_points_in_buffer):
        poi_in_buffer = [poi_object for poi_object in self.poi if poi_object.id in id_points_in_buffer]
        return POISerializer(poi_in_buffer, many=True)
    
    def get_rating_value(self, serializer_poi: POISerializer):
        ratings = [data.get('rating') for data in serializer_poi.data if data.get('rating') is not None]
        if len(ratings) < 1:
            return 0
        return sum(ratings) / len(ratings)
    
    def get_rate(self, rating, count):
        rate_value_mapping = {'rating': 0.6, 'count': 0.4}
        return rating * rate_value_mapping['rating'] + count * rate_value_mapping['count']
        
    def get_route_rate(self):
        if len(self.poi) > 0:
            points_objects = self.get_point_objects()
            id_points_in_buffer = self.get_id_point_in_buffer(points_objects)
            serializer_poi = self.get_serialize_poi_in_buffer(id_points_in_buffer)
            rating = self.get_rating_value(serializer_poi)
            count = len(serializer_poi.data)
            return self.get_rate(rating, count)
        return None