from rest_framework import serializers
from .models import AboutMe, Category, Post, ContactMessage

class AboutMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutMe
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # Postları çekerken bağlı olduğu kategorinin adını ve bölümünü de Angular'a gönderelim
    category_name = serializers.CharField(source='category.name', read_only=True)
    section_name = serializers.CharField(source='category.section', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'