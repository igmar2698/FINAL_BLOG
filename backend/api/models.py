from django.db import models

class AboutMe(models.Model):
    # Hocanın istediği: İsim Soyisim, Yaş, Yaşadığım Şehir, Mesleğim, LinkedIn, Github (Ayrı ayrı text box)
    name_surname = models.CharField(max_length=100, verbose_name="İsim Soyisim")
    age = models.IntegerField(verbose_name="Yaş")
    city = models.CharField(max_length=100, verbose_name="Yaşadığım Şehir")
    profession = models.CharField(max_length=100, verbose_name="Mesleğim")
    linkedin_url = models.URLField(verbose_name="LinkedIn URL")
    github_url = models.URLField(verbose_name="Github URL")
    
    # Hocanın istediği: Uzunca bir paragraf yazılabilecek açıklama
    description = models.TextField(verbose_name="Açıklama")
    
    # Hocanın istediği: Güncel fotoğraf ekleme/değiştirme
    photo = models.ImageField(upload_to='about_photos/', null=True, blank=True, verbose_name="Güncel Fotoğraf")

    class Meta:
        verbose_name = "Hakkımda Bilgisi"
        verbose_name_plural = "Hakkımda Bilgileri"

    def __str__(self):
        return self.name_surname

class Category(models.Model):
    # Hocanın kırılımları: Teknik Bilgi, Teknik Olmayan Bilgi, Araştırmalarım, Hobilerim, Okuduğum Kitaplar
    SECTION_CHOICES = [
        ('Teknik Bilgi', 'Teknik Bilgi'),
        ('Teknik Olmayan Bilgi', 'Teknik Olmayan Bilgi'),
        ('Araştırmalarım', 'Araştırmalarım'),
        ('Hobilerim', 'Hobilerim'),
        ('Okuduğum Kitaplar', 'Okuduğum Kitaplar'),
    ]
    section = models.CharField(max_length=50, choices=SECTION_CHOICES, verbose_name="Eklenecek Bölüm")
    name = models.CharField(max_length=100, verbose_name="Kategori Adı")

    class Meta:
        verbose_name = "Kategori"
        verbose_name_plural = "Kategoriler"

    def __str__(self):
        return f"{self.section} -> {self.name}"

class Post(models.Model):
    # Yazılarımızı yukarıdaki kategorilere bağlıyoruz
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, verbose_name="Bağlı Olduğu Kategori")
    title = models.CharField(max_length=200, verbose_name="Başlık")
    content = models.TextField(verbose_name="İçerik")
    image = models.ImageField(upload_to='posts/', null=True, blank=True, verbose_name="Görsel")
    is_featured = models.BooleanField(default=False, verbose_name="Ana Sayfada Öne Çıkar")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Blog Yazısı"
        verbose_name_plural = "Blog Yazıları"

    def __str__(self):
        return self.title

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name