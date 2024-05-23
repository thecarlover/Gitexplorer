import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupMenuToggle();
  }

  setupMenuToggle(): void {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        if (menuBtn.classList.contains('active')) {
          mobileMenu.style.display = 'block';
        } else {
          mobileMenu.style.display = 'none';
        }
      });
    }
  }
}
