from django.contrib import admin
from .models import AboutMe, Category, Post, ContactMessage

# Admin panel başlıklarını özelleştirme
admin.site.site_header = "Blog Yönetim Paneli"
admin.site.index_title = "İçerik Yönetimi"

@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    list_display = ('name_surname', 'profession', 'city')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'section')
    list_filter = ('section',) # Hoca buraya basıp direkt "Hobilerim" kategorilerini filtreleyebilecek

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'created_at')
    list_filter = ('is_featured', 'category')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')