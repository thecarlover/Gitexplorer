import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private accessToken = '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'; 

  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    const url = `https://api.github.com/users/${githubUsername}`;
    const headers = new HttpHeaders().set('Authorization', 'token ' + this.accessToken);
    return this.httpClient.get(url, { headers });
  }

  getRepos(githubUsername: string): Observable<any[]> {
    const url = `https://api.github.com/users/${githubUsername}/repos`;
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
