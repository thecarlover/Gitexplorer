import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private accessToken: string | null = null;

  constructor(private httpClient: HttpClient) { }

  authenticateWithGitHub(): void {
    const clientId = 'Iv23liWg1ICEbd4j7dq2';
    const redirectUri = 'https://loaclhost:4200';
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user repo`;

    // Redirect the user to the GitHub OAuth authorization URL
    window.location.href = authorizationUrl;
  }

  handleAuthorizationCallback(code: string): Observable<any> {
    const clientId = 'Iv23liWg1ICEbd4j7dq2';
    const clientSecret = '8e7a3ff153a68f7a4592c72d33d4fd6357a7f43b';
    const redirectUri = 'https://localhost:4200';
    const tokenUrl = 'https://github.com/login/oauth/access_token';

    const body = `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`;

    // Exchange authorization code for access token
    return this.httpClient.post(tokenUrl, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }).pipe(
      map((response: any) => {
        this.accessToken = response.access_token;
        return response;
      })
    );
  }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(githubUsername: string): Observable<any[]> {
    if (!this.accessToken) {
      throw new Error('Access token not available.');
    }

    const headers = {
      'Authorization': `Bearer ${this.accessToken}`
    };

    return this.httpClient.get<any[]>(`https://api.github.com/users/${githubUsername}/repos`, { headers }).pipe(
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
