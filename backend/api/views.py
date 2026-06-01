from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AboutMe, Category, Post
from .serializers import AboutMeSerializer, CategorySerializer, PostSerializer, ContactMessageSerializer

class AboutMeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutMe.objects.all()
    serializer_class = AboutMeSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        # En yeni post en üstte gelsin
        queryset = Post.objects.all().order_by('-created_at')
        
        # Sadece öne çıkanlar isteniyorsa (Ana sayfa için)
        is_featured = self.request.query_params.get('is_featured', None)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset

@api_view(['POST'])
def send_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": "Mesaj başarıyla ulaştı!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)