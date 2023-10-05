import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewSongComponent} from "./components/songs/view-song/view-song.component";
import {EditSongComponent} from "./components/admin/edit-song/edit-song.component";
import {ArtistsComponent} from "./components/admin/artists/artists.component";
import {authGuard} from "./guard/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/artists',
    data: {
      roles: 1
    },
    canActivate: [authGuard],
    component: ArtistsComponent
  },
  {
    path: 'songs/:id',
    component: ViewSongComponent
  },
  {
    path: 'admin/songs/old/:id',
    canActivate: [authGuard],
    component: EditSongComponent,
    data: {
      roles: 1
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
