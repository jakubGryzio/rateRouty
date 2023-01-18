from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, Permission
import json
from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from django.urls import reverse
from ..models import POI
from ..serializers import POISerializer

client = APIClient()

class UserCreateToTest():
    def __init__(self, permission):
        self.user = User.objects.create(username='admin', is_staff=True)
        self.user.set_password('admin')
        self.token = Token.objects.create(user=self.user)
        self.user.user_permissions.add(Permission.objects.get(codename=permission))
        client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token.key)
    
class GetAllPOITest(TestCase):

    def setUp(self):
        test = UserCreateToTest('view_poi')
        POI.objects.create(guid=123456, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        POI.objects.create(guid=456789, location="20.00, 54.00", type="petrol station", user=test.user, name=True)
        POI.objects.create(guid=123455, location="27.00, 67.00", type="cafe",  user=test.user, name=True)
        POI.objects.create(guid=678909, location="29.00, 33.00", type="hotel",  user=test.user, name=True)
        

    def test_get_all_poi(self):
        response = client.get(reverse('get_list_poi'))
        pois = POI.objects.all()
        serializer = POISerializer(pois, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    ### TEST PERMISSION


class GetSinglePOItest(TestCase):

    def setUp(self):
        test = UserCreateToTest('view_poi')
        self.poi1 = POI.objects.create(guid=123456, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.poi2 = POI.objects.create(guid=456789, location="20.00, 54.00", type="petrol station", user=test.user, name=True)
        self.poi3 = POI.objects.create(guid=123455, location="27.00, 67.00", type="cafe",  user=test.user, name=True)
        self.poi4 = POI.objects.create(guid=678909, location="29.00, 33.00", type="hotel",  user=test.user, name=True)
    
    def test_get_valid_single_poi(self):
        response = client.get(reverse('get_detail_poi', kwargs={'pk': self.poi1.pk}))
        poi = POI.objects.get(pk=self.poi1.pk)
        serializer = POISerializer(poi)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_poi(self):
        response = client.get(reverse('get_detail_poi', kwargs={'pk': 30000}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PostNewPoiTest(TestCase):

    def setUp(self):
        test = UserCreateToTest('add_poi')
        self.valid_payload = {
            "guid": 123459,
            "location": "14.56, 56.90",
            "type": "cinema",
            "user": test.user.id + 5,
            "name": True
        }
        
        self.invalid_payload = {
            "guid": None,
            "location": 14.76,
            "type": "cinema",
            "name": True
        }

    """ def test_post_valid_poi(self):
        response = client.post(reverse('get_post_poi'),
                                data=json.dumps(self.valid_payload), 
                                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED) """

    def test_post_invalid_poi(self):
        response = client.post(reverse('get_post_poi'),
                                data=json.dumps(self.invalid_payload), 
                                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSinglePOITest(TestCase):

    def setUp(self):
        test = UserCreateToTest("change_poi")
        self.poi1 = POI.objects.create(guid=123456, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.poi2 = POI.objects.create(guid=456789, location="20.00, 54.00", type="petrol station", user=test.user, name=True)
        self.valid_payload = {
            "guid": 888888,
            "location": "14.678, 89.190",
            "type": "cinema"
        }
        self.invalid_payload = {
            "guid": None,
            "location": 14.76,
            "type": "cinema"
        }

    def test_valid_update_poi(self):
        response = client.put(reverse('get_update_poi', kwargs={'pk': self.poi1.pk}), data=json.dumps(self.valid_payload), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_poi(self):
        response = client.put(reverse('get_update_poi', kwargs={'pk': self.poi2.pk}), data=json.dumps(self.invalid_payload), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSinglePOITest(TestCase):

    def setUp(self):
        test = UserCreateToTest("delete_poi")
        self.poi1 = POI.objects.create(guid=123456, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.poi2 = POI.objects.create(guid=456789, location="20.00, 54.00", type="petrol station", user=test.user, name=True)

    def test_valid_delete_poi(self):
        response = client.delete(reverse('get_delete_poi', kwargs={'pk': self.poi1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_poi(self):
        response = client.delete(reverse('get_delete_poi', kwargs={'pk': 1000}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND) 