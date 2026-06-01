import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html'
})
export class AppComponent {
  isLightMode = false;
  isDonateModalOpen = false; // BAĞIŞ PENCERESİ KONTROLÜ

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if (this.isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }

  // PENCEREYİ AÇMA FONKSİYONU
  openDonateModal() {
    // BU SATIR BİZE BUTONUN ÇALIŞIP ÇALIŞMADIĞINI KANITLAYACAK:
    // alert("BUTON ÇALIŞIYOR KANKA!"); 
    this.isDonateModalOpen = true;
  }

  // PENCEREYİ KAPATMA FONKSİYONU
  closeDonateModal() {
    this.isDonateModalOpen = false;
  }
}