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
    this.http.get('http://127.0.0.1:8000/api/posts/?is_featured=true').subscribe({
      next: (data: any) => {
        this.posts = data;
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

    this.http.post('http://127.0.0.1:8000/api/contact/', this.contactData).subscribe({
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
        alert("Mesaj gönderilemedi kanka, API'de bir sorun olabilir.");
        this.cdr.detectChanges();
      }
    });
  }
}