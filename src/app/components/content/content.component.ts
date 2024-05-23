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
  loading: boolean = false; // Added loading state

  constructor(private apiService: ApiService) {}

  searchRepos() {
    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username';
      return;
    }

    this.loading = true; // Set loading to true when fetching data

    this.apiService.getUser(this.githubUsername).subscribe({
      next: (userData) => {
        this.user = userData;
        this.error = null;
        this.apiService.getRepos(this.githubUsername).subscribe({
          next: (repoData) => {
            this.repos = repoData;
            this.loading = false; // Set loading to false after data is fetched
          },
          error: () => {
            this.error = 'Repositories not found or an error occurred';
            this.repos = [];
            this.loading = false; // Set loading to false if there's an error
          }
        });
      },
      error: () => {
        this.error = 'User not found or an error occurred';
        this.user = null;
        this.repos = [];
        this.loading = false; // Set loading to false if there's an error
      }
    });
  }

  getLanguagesString(languages: any): string[] {
    return Object.keys(languages);
  }
}
