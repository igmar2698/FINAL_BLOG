import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  posts: any[] = []; 
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  // === PENCERE (MODAL) İÇİN GEREKLİ DEĞİŞKEN VE FONKSİYONLAR ===
  selectedPost: any = null;

  openPost(post: any) { 
    this.selectedPost = post; 
  }
  
  closePost() { 
    this.selectedPost = null; 
  }
  // ==============================================================

  // İletişim formu için gerekli değişkenler
  contactData = { name: '', email: '', message: '' };
  isSending = false;
  successMessage = '';

  ngOnInit() {
    // 1. CANLI LİNK EKLENDİ VE KUTU İÇİNDEN ÇIKARMA (RESULTS) DÜZELTİLDİ
    this.http.get('https://final-blog-4p56.onrender.com/api/posts/?is_featured=true').subscribe({
      next: (data: any) => {
        // İŞTE SİHİRLİ DOKUNUŞ: Veri pagination ile (results içinde) gelirse içinden alıyoruz
        this.posts = data.results ? data.results : data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Hata:", err)
    });
  }

  // Gönder butonuna basıldığında çalışacak fonksiyon
  sendMessage() {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      alert("Kanka lütfen tüm alanları doldur!");
      return;
    }

    this.isSending = true;
    this.cdr.detectChanges(); // 'Kargolanıyor...' yazısını anında göstermek için

    // 2. İLETİŞİM FORMU CANLI LİNKE YÖNLENDİRİLDİ
    this.http.post('https://final-blog-4p56.onrender.com/api/contact/', this.contactData).subscribe({
      next: (res: any) => {
        this.isSending = false;
        this.successMessage = "Mesajın başarıyla ulaştı kanka!";
        this.contactData = { name: '', email: '', message: '' }; // Kutuları temizle
        this.cdr.detectChanges();
        
        // 4 saniye sonra yeşil başarı yazısını sil
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 4000);
      },
      error: (err) => {
        this.isSending = false;
        console.error("Mesaj gönderilirken hata:", err);
        
        // --- İŞTE YENİ EKLENEN PROFESYONEL HATA YAKALAMA KISMI ---
        if (err.status === 400 && err.error) {
          // Backend'den gelen hata objesinin içindeki mesajları çıkarıp birleştiriyoruz
          let hataMesajlari = Object.values(err.error).flat().join('\n');
          alert("Hata:\n" + hataMesajlari);
        } else {
          // Gerçekten sunucuya ulaşılamazsa veya farklı bir çökme varsa çalışacak standart hata
          alert("Mesaj gönderilemedi kanka, sunucuya ulaşılamıyor.");
        }
        // --------------------------------------------------------

        this.cdr.detectChanges();
      }
    });
  }
}