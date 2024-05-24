import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule


import { ApiService } from './services/api.service';
import { MatDialogModule } from '@angular/material/dialog';




import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContentComponent } from './components/content/content.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReadmeDialogComponent } from './components/readme-dialog/readme-dialog.component';
import { ThankComponent } from './components/thank/thank.component';
import { FooterComponent } from './components/footer/footer.component';



// import { SearchbarComponent } from './components/searchbar/searchbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ReadmeDialogComponent,
    ThankComponent,
    FooterComponent,
   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
    BrowserAnimationsModule,
    MatDialogModule
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
