import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryComponent } from './directory/directory.component';
import { ImagesComponent } from './images/images.component';
import { SearchComponent } from './search/search.component';
import { TestSamplesComponent } from './test-samples/test-samples.component';

const routes: Routes = [
  {
    path: 'directory',
    pathMatch: 'full',
    component: DirectoryComponent
  },
  { path: 'search', component: SearchComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'test', component:  TestSamplesComponent},
  { path: '**', redirectTo: 'directory'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
