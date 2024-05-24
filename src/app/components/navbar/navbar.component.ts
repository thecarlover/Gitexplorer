import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReadmeDialogComponent } from '../readme-dialog/readme-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title: string = '';
  currentIndex: number = 0;
  words: string[] = ['G', 'Gi', 'Git', 'GitE', 'GitEx', 'GitExp', 'GitExpl', 'GitExplo', 'GitExplor', 'GitExplore', 'GitExplorer'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.typeTitle(); // Call the method to start typing animation
  }

  typeTitle(): void {
    setInterval(() => {
      this.title = this.words[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
    }, 200);
  }

  openReadmeDialog(): void {
    const dialogRef = this.dialog.open(ReadmeDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
