import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './all-posts.html'
})
export class AllPostsComponent implements OnInit {
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);
  posts: any[] = [];
  selectedPost: any = null;

  // Angular bu sayfa açılır açılmaz burayı çalıştırır
  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    // Tarayıcıyı kandırmak ve hafızadan okumasını engellemek için linkin sonuna anlık saati ekliyoruz
    const timestamp = new Date().getTime();
    const apiUrl = `http://127.0.0.1:8000/api/posts/?t=${timestamp}`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.posts = data;
        this.cdr.detectChanges(); // Veri geldi, ekranı hemen güncelle!
      },
      error: (err) => console.error("API Hatası:", err)
    });
  }

  openPost(post: any) { 
    this.selectedPost = post; 
  }
  
  closePost() { 
    this.selectedPost = null; 
  }
}