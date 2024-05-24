// src/app/content/content.component.ts
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

  perPageOptions: number[] = [10, 20, 50, 100]; // Options for page size dropdown

  constructor(private apiService: ApiService) {
    // Set default page size
    this.perPage = 10;
  }

  searchRepos(page: number = 1) {
    this.loading = true; // Set loading to true when search starts
  
    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username';
      this.loading = false; // Reset loading state
      return;
    }
  
    this.currentPage = page;
  
    this.apiService.getUser(this.githubUsername).subscribe({
      next: (userData) => {
        this.user = userData;
        this.error = null;
        this.apiService.getReposWithPageSize(this.githubUsername, this.currentPage, this.perPage).subscribe({
          next: (repoData) => {
            this.repos = repoData;
            this.totalPages = Math.ceil(userData.public_repos / this.perPage);
            this.loading = false; // Set loading to false when fetching is done
          },
          error: () => {
            this.error = 'Repositories not found or an error occurred';
            this.repos = [];
            this.loading = false; // Set loading to false when fetching is done
          }
        });
      },
      error: () => {
        this.error = 'User not found or an error occurred';
        this.user = null;
        this.repos = [];
        this.loading = false; // Set loading to false when fetching is done
      }
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.searchRepos(page);
  }

  changePageSize(event: any) {
    // Extract the selected value from the event object
    const selectedPageSize = event.target.value;
    // Update page size and reload repositories
    this.perPage = selectedPageSize;
    this.searchRepos();
  }
  

  getLanguagesString(languages: any): string[] {
    return Object.keys(languages);
  }
}
