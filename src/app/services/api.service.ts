// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private accessToken = environment.githubAccessToken;

  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    const url = `https://api.github.com/users/${githubUsername}`;
    const headers = new HttpHeaders().set('Authorization', 'token ' + this.accessToken);
    return this.httpClient.get(url, { headers });
  }

  getRepos(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`;
    const headers = new HttpHeaders().set('Authorization', 'token ' + this.accessToken);
    return this.httpClient.get<any[]>(url, { headers }).pipe(
      switchMap(repos => {
        const repoRequests = repos.map(repo =>
          this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repo.name}/languages`, { headers }).pipe(
            map(languages => ({ ...repo, languages }))
          )
        );
        return forkJoin(repoRequests);
      })
    );
  }

  // Method to get repositories with specified page size
  getReposWithPageSize(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`;
    const headers = new HttpHeaders().set('Authorization', 'token ' + this.accessToken);
    return this.httpClient.get<any[]>(url, { headers }).pipe(
      switchMap(repos => {
        const repoRequests = repos.map(repo =>
          this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repo.name}/languages`, { headers }).pipe(
            map(languages => ({ ...repo, languages }))
          )
        );
        return forkJoin(repoRequests);
      })
    );
  }
}
