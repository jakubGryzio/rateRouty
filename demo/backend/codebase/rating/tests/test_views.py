from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, Permission
from django.conf import settings
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
import json
from poi.models import POI
from ..models import Rating
from ..serializers import RatingSerializer

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
        test = UserCreateToTest('view_rating')
        self.poi1 = POI.objects.create(guid=123456, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.rating1 = Rating.objects.create(value=2, guid=self.poi1, user=test.user)
        self.poi2 = POI.objects.all().first()
        self.rating2 = Rating.objects.create(value=2, guid=self.poi2, user=test.user)
        
    def test_get_all_poi(self):
        response = client.get(reverse('get_list_rating'))
        ratings = Rating.objects.all()
        serializer = RatingSerializer(ratings, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GetSingleRatingTest(TestCase):

    def setUp(self):
        test = UserCreateToTest('view_rating')
        self.poi1 = POI.objects.create(guid=123456, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.rating1 = Rating.objects.create(value=2, guid=self.poi1, user=test.user)
        
    def test_get_valid_single_rating(self):
        response = client.get(reverse('get_detail_rating', kwargs={'pk': self.rating1.pk}))
        rating = Rating.objects.get(pk=self.rating1.pk)
        serializer = RatingSerializer(rating)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_rating(self):
        response = client.get(reverse('get_detail_rating', kwargs={'pk': 30000}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class PostNewRatingTest(TestCase):

    def setUp(self):
        self.test = UserCreateToTest('add_rating')
        self.poi1 = POI.objects.create(guid=999000, location="24.00, 52.00", type="restaurant", user=self.test.user, name=True)
        self.valid_payload = {
            "guid": 999000,
            "value": 2,
        }
        
        self.invalid_payload = {
            "guid": None,
            "value": None
        }

    """ def test_post_valid_rating(self):
        response = client.post(reverse('get_post_rating'),
                                data=json.dumps(self.valid_payload),
                                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED) """

    def test_post_invalid_rating(self):
        response = client.post(reverse('get_post_rating'),
                                data=json.dumps(self.invalid_payload), 
                                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSinglePOITest(TestCase):

    def setUp(self):
        test = UserCreateToTest("change_rating")
        self.poi1 = POI.objects.create(guid=999000, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.rating1 = Rating.objects.create(value=2, guid=self.poi1, user=test.user)
        self.rating2 = Rating.objects.create(value=1, guid=self.poi1, user=test.user)
        self.valid_payload = {
            "value": 1
        }
        self.invalid_payload = {
            "guid": "bad_guid",
            "value": None,
        }

    def test_valid_update_rating(self):
        response = client.put(reverse('get_update_rating', kwargs={'pk': self.rating1.pk}), data=json.dumps(self.valid_payload), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_rating(self):
        response = client.put(reverse('get_update_rating', kwargs={'pk': self.rating2.pk}), data=json.dumps(self.invalid_payload), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleRatingTest(TestCase):

    def setUp(self):
        test = UserCreateToTest("delete_rating")
        self.poi1 = POI.objects.create(guid=999000, location="24.00, 52.00", type="restaurant", user=test.user, name=True)
        self.rating1 = Rating.objects.create(value=2, guid=self.poi1, user=test.user)

    def test_valid_delete_rating(self):
        response = client.delete(reverse('get_delete_rating', kwargs={'pk': self.rating1.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_rating(self):
        response = client.delete(reverse('get_delete_rating', kwargs={'pk': 1000}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND) 