import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApolloModule, APOLLO_OPTIONS} from "apollo-angular";
import {HttpClientModule} from "@angular/common/http";
import {createApollo} from "./shared/graphql-conf";
import {HttpLink} from "apollo-angular/http";
import { ViewSongComponent } from './songs/view-song/view-song.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
