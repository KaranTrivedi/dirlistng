import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadsComponent } from './downloads/downloads.component';
import { ImagesComponent } from './images/images.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: 'shows', component: DownloadsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'images', component: ImagesComponent },
  {path: '**', redirectTo: 'shows'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
