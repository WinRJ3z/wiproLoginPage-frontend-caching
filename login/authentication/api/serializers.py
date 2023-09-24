from rest_framework.serializers import ModelSerializer
from ..models import Note


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

from rest_framework import serializers
from ..models import AlpineVersions, KindleVersions, PostgresqlVersions, PythonVersions, RubyVersions, Business

class AlpineVersionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlpineVersions
        fields = ('version', 'release_date', 'end_of_life_date', 'latest', 'id')

class PostgresqlVersionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostgresqlVersions
        fields = ('version', 'release_date', 'end_of_life_date', 'latest')

class RubyVersionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RubyVersions
        fields = ('version', 'release_date', 'end_of_life_date', 'latest')

class KindleVersionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = KindleVersions
        fields = ('version', 'release_date', 'end_of_life_date', 'latest')

class PythonVersionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PythonVersions
        fields = ('version', 'release_date', 'end_of_life_date', 'latest')

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = '__all__'
