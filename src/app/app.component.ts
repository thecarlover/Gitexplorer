// src/app/app.component.ts
import { Component,HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isReadmeRoute: boolean = false;
displayDialog: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isReadmeRoute = event.url === '/readme';
      }
    });

    
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.displayDialog = true;
    return false;
  }

  
}
