from django import forms

from .models import POI


class POIForm(forms.ModelForm):
    class Meta:
        model = POI
        fields = [
            'location',
            'type',
            'ratings',
            'attributes'
        ]