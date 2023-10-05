import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";
import {UserProfile} from "../shared/http/response/auth";

const ACCESS_TOKEN = 'accessToken';
const PROFILE = 'profile';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  constructor(
    private cookieService: CookieService
  ) { }

  getUserProfile(userId: string): UserProfile {
    const data = localStorage.getItem(this.getKey(PROFILE, userId));

    if (!data) {
      throw `No user profile found for ID ${userId}!`;
    }

    return JSON.parse(data) as UserProfile;
  }

  getAccessToken(userId: string): string | null | undefined {
    return localStorage.getItem(this.getKey(ACCESS_TOKEN, userId));
  }

  putAccessToken(userId: string, token: string | null | undefined): void {
    if (token) {
      localStorage.setItem(this.getKey(ACCESS_TOKEN, userId), String(token));
    } else {
      localStorage.removeItem(this.getKey(ACCESS_TOKEN, userId));
    }
  }

  clearAuthStorage(): void {
    localStorage.clear();
    this.cookieService.deleteAll('/', 'localhost:4200');
  }

  private getKey(key: string, userId: string): string {
    return `realm-web:app(${environment.mongo.realm.appId}):user(${userId}):${key}`
  }
}
