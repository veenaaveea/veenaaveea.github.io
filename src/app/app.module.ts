import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApolloModule, APOLLO_OPTIONS} from "apollo-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {createApollo} from "./shared/graphql-conf";
import {HttpLink} from "apollo-angular/http";
import {ViewSongComponent} from './components/songs/view-song/view-song.component';
import {EditSongComponent} from './components/admin/edit-song/edit-song.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtistsComponent} from './components/admin/artists/artists.component';
import {EditArtistComponent} from './components/admin/artists/edit-artist/edit-artist.component';
import {DeleteArtistComponent} from './components/admin/artists/delete-artist/delete-artist.component';
import {LoginComponent} from './components/login/login.component';
import {LoaderComponent} from './components/loader/loader.component';
import {LoaderInterceptor} from "./interceptors/loader";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewSongComponent,
    EditSongComponent,
    ArtistsComponent,
    EditArtistComponent,
    DeleteArtistComponent,
    LoginComponent,
    LoaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
