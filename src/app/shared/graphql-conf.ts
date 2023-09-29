import * as realm from './realm';
import {HttpLink} from "apollo-angular/http";
import {ApolloClientOptions, InMemoryCache} from "@apollo/client/core";
import {HttpHeaders} from "@angular/common/http";
const uri = realm.graphqlUrl;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }),
    cache: new InMemoryCache()
  };
}
