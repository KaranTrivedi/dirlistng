import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryComponent } from './directory/directory.component';
import { ImagesComponent } from './images/images.component';
import { SearchComponent } from './search/search.component';
import { TestSamplesComponent } from './test-samples/test-samples.component';

const routes: Routes = [
  { path: 'directory', component: DirectoryComponent},
  { path: 'directory/:id1', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4/:id5', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4/:id5/:id6', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4/:id5/:id6/:id7', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4/:id5/:id6/:id7/:id8', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4/:id5/:id6/:id7/:id8/:id9', component:  DirectoryComponent},
  { path: 'directory/:id1/:id2/:id3/:id4/:id5/:id6/:id7/:id8/:id9/:id10', component:  DirectoryComponent},

  { path: 'test', component:  TestSamplesComponent},
  { path: 'search', component: SearchComponent },
  { path: 'images', component: ImagesComponent },
  { path: '**', redirectTo: 'directory'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
