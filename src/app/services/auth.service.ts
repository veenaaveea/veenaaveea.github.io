import {Injectable} from '@angular/core';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import * as Realm from "realm-web";
import {environment} from "../../environments/environment";
import {AuthStorageService} from "./auth-storage.service";
import {DateTime} from "luxon";
import {Router} from "@angular/router";
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private realmApp = new Realm.App(environment.mongo.realm.appId);
  private anonymous: boolean = true;

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.refresh()
      .then(() => {
        console.log(`Authentication data refreshed`);
      });
  }

  get loggedIn(): boolean {
    let loggedIn = false;

    if (this.realmApp.currentUser && this.accessToken) {
      const jwtData = jwt_decode<JwtPayload>(this.accessToken);
      const profile = this.authStorageService.getUserProfile(this.realmApp.currentUser.id);
      const name = profile.data?.name;
      loggedIn = name != 'anonymous' && DateTime.now().toUnixInteger() < jwtData.exp!;
    }

    return loggedIn;
  }

  get roles(): number {
    return 1;
  }

  get accessToken(): string | null | undefined {
    if (!(this.realmApp.currentUser?.id)) {
      return null;
    }

    return this.authStorageService.getAccessToken(this.realmApp.currentUser.id);
  }

  login(email: string, password: string): Promise<Realm.User> {
    this.loaderService.loading();
    return this.realmApp.logIn(Realm.Credentials.emailPassword(email, password))
      .then((user: Realm.User) => {
        this.loaderService.loaded();
        this.authStorageService.putAccessToken(user.id, user.accessToken);
        return user;
      });
  }

  logout() {
    this.loaderService.loading();
    this.realmApp.currentUser?.logOut()
      .then(() => {
        this.authStorageService.clearAuthStorage();
        this.router.navigateByUrl('/')
          .then(res => {
            if (res) {
              console.log(res);
            }
          });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.loaderService.loaded();
      });
  }

  hasRoles(roles: number): boolean {
    return (this.roles & roles) != 0;
  }

  async refresh(): Promise<void> {
    if (!this.realmApp.currentUser) {
      if (this.accessToken) {
        await this.realmApp.logIn(Realm.Credentials.jwt(this.accessToken));
      } else {
        await this.realmApp.logIn(Realm.Credentials.apiKey(environment.mongo.realm.apiKeys.anonymous));
      }
    } else {
      await this.realmApp.currentUser.refreshCustomData();
    }
  }
}
