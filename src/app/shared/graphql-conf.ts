import {HttpLink} from "apollo-angular/http";
import {ApolloClientOptions, InMemoryCache} from "@apollo/client/core";
import {HttpHeaders} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {environment} from "../../environments/environment";

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const authService = inject(AuthService);
  return {
    link: httpLink.create({
      uri: environment.mongo.graphqlUrl,
      headers: new HttpHeaders().set('Authorization', `Bearer ${authService.accessToken}`)
    }),
    cache: new InMemoryCache()
  };
}
