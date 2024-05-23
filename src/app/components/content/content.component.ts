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
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 0;
  perPage: number = 10;

  constructor(private apiService: ApiService) {}

  searchRepos(page: number = 1) {
    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username';
      return;
    }

    this.loading = true;
    this.currentPage = page;

    this.apiService.getUser(this.githubUsername).subscribe({
      next: (userData) => {
        this.user = userData;
        this.error = null;
        this.apiService.getRepos(this.githubUsername, this.currentPage, this.perPage).subscribe({
          next: (repoData) => {
            this.repos = repoData;
            this.totalPages = Math.ceil(userData.public_repos / this.perPage);
            this.loading = false;
          },
          error: () => {
            this.error = 'Repositories not found or an error occurred';
            this.repos = [];
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'User not found or an error occurred';
        this.user = null;
        this.repos = [];
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.searchRepos(page);
  }

  getLanguagesString(languages: any): string[] {
    return Object.keys(languages);
  }
}
