import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { FoldersComponent } from './downloads/folders/folders.component';
import { FilesComponent } from './downloads/files/files.component';
import { SearchComponent } from './search/search.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    DownloadsComponent,
    FoldersComponent,
    FilesComponent,
    SearchComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
