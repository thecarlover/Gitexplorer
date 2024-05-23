import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title: string = '';
  currentIndex: number = 0;
  words: string[] = ['G', 'Gi', 'Git', 'GitE', 'GitEx', 'GitExp', 'GitExpl', 'GitExplo', 'GitExplor', 'GitExplore', 'GitExplorer'];

  constructor() { }

  ngOnInit(): void {
    this.typeTitle();
  }

  typeTitle(): void {
    setInterval(() => {
      this.title = this.words[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
    }, 200);
  }

}
