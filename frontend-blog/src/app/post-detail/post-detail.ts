import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div *ngIf="post" style="max-width: 800px; margin: auto; padding: 20px; color: white;">
      <h1>{{ post.title }}</h1>
      <img [src]="'http://127.0.0.1:8000' + post.image" style="width: 100%; border-radius: 10px;">
      <p style="margin-top: 20px; line-height: 1.6;">{{ post.content }}</p>
    </div>
  `
})
export class PostDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  post: any;

  ngOnInit() {
    // URL'den ID'yi alıyoruz
    const id = this.route.snapshot.paramMap.get('id');
    
    // O ID'ye ait veriyi Django'dan çekiyoruz
    this.http.get(`http://127.0.0.1:8000/api/posts/${id}/`).subscribe({
      next: (data: any) => {
        this.post = data;
      },
      error: (err) => {
        console.error("Detay verisi çekilemedi:", err);
      }
    });
  }
}