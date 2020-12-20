import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryComponent } from './directory/directory.component';
import { ImagesComponent } from './images/images.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: 'directory', component: DirectoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'images', component: ImagesComponent },
  {path: '**', redirectTo: 'directory'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
