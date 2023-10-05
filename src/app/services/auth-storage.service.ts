import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  constructor(
    private cookieService: CookieService
  ) { }

  getAccessToken(userId: string): string | null | undefined {
    return localStorage.getItem(this.getTokenKey(userId));
  }

  putAccessToken(userId: string, token: string | null | undefined): void {
    if (token) {
      localStorage.setItem(this.getTokenKey(userId), String(token));
    } else {
      localStorage.removeItem(this.getTokenKey(userId));
    }
  }

  clearAuthStorage(): void {
    localStorage.clear();
    this.cookieService.deleteAll('/', 'localhost:4200');
  }

  private getTokenKey(userId: string): string {
    return `realm-web:app(${environment.mongo.realm.appId}):user(${userId}):accessToken`
  }
}
