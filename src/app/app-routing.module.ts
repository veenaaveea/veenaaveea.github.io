import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {RealmAuthGuard} from "./realm-auth.guard";
import {ViewSongComponent} from "./songs/view-song/view-song.component";

const ROUTES: Routes = [
  {
    path: '',
    canActivate: [RealmAuthGuard],
    children: [
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'songs/:id',
        component: ViewSongComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
