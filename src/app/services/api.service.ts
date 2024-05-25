import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    const url = `https://api.github.com/users/${githubUsername}`;
    return this.httpClient.get(url);
  }

  getRepos(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<any[]>(url).pipe(
      switchMap(repos => {
        const repoRequests = repos.map(repo =>
          this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repo.name}/languages`).pipe(
            map(languages => ({ ...repo, languages }))
          )
        );
        return forkJoin(repoRequests);
      })
    );
  }

  getReposWithPageSize(githubUsername: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<any[]>(url).pipe(
      switchMap(repos => {
        const repoRequests = repos.map(repo =>
          this.httpClient.get(`https://api.github.com/repos/${githubUsername}/${repo.name}/languages`).pipe(
            map(languages => ({ ...repo, languages }))
          )
        );
        return forkJoin(repoRequests);
      })
    );
  }
}
