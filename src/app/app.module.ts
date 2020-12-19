import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { FoldersComponent } from './downloads/folders/folders.component';
import { FilesComponent } from './downloads/files/files.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';

import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import {MatExpansionModule} from '@angular/material/expansion';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchVideoComponent } from './search/search-video/search-video.component';
import { ImagesComponent } from './images/images.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadsComponent,
    FoldersComponent,
    FilesComponent,
    SearchComponent,
    HeaderComponent,
    SearchVideoComponent,
    ImagesComponent
  ],
  imports: [
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
