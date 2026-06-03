import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit {
  aboutData: any = {}; // Django'dan gelen verileri tutacağımız kutu
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // BİZİM YENİ CANLI API ADRESİMİZ:
    this.http.get('https://final-blog-4p56.onrender.com/api/aboutme/').subscribe({
      next: (data: any) => {
        // Django'nun veriyi nasıl paketlediğini bulup içinden cımbızla alıyoruz:
        if (data.results && data.results.length > 0) {
          this.aboutData = data.results[0]; // Sayfalama (Pagination) varsa
        } else if (Array.isArray(data) && data.length > 0) {
          this.aboutData = data[0]; // Düz liste şeklinde geliyorsa
        } else {
          this.aboutData = data; // Direkt tekil obje geliyorsa
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Hakkımda verisi çekilemedi:", err);
      }
    });
  }
}