import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  githubUsername: string = '';
  user: any = null;
  repos: any[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  searchRepos() {
    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username';
      return;
    }

    this.apiService.getUser(this.githubUsername).subscribe({
      next: (userData) => {
        this.user = userData;
        this.error = null;
        this.apiService.getRepos(this.githubUsername).subscribe({
          next: (repoData) => {
            this.repos = repoData;
          },
          error: () => {
            this.error = 'Repositories not found or an error occurred';
            this.repos = [];
          }
        });
      },
      error: () => {
        this.error = 'User not found or an error occurred';
        this.user = null;
        this.repos = [];
      }
    });
  }

  getLanguagesString(languages: any): string[] {
    return Object.keys(languages);
  }
}
