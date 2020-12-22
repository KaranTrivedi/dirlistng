import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory/directory.component';
import { FoldersComponent } from './directory/folders/folders.component';
import { FilesComponent } from './directory/files/files.component';
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
import {MatSortModule} from '@angular/material/sort';
import { TestSamplesComponent } from './test-samples/test-samples.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

// export class MyHammerConfig extends HammerGestureConfig  {
//   overrides = <any>{
//     'swipe': {velocity: 0.4, threshold: 20} // override default settings
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    DirectoryComponent,
    FoldersComponent,
    FilesComponent,
    SearchComponent,
    HeaderComponent,
    SearchVideoComponent,
    ImagesComponent,
    TestSamplesComponent
  ],
  imports: [
    MatTooltipModule,
    MatListModule,
    MatSidenavModule,
    MatRippleModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSortModule,
    // MatToolbarModule,
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
  providers:
  [

  ],
  bootstrap: [AppComponent],
  entryComponents: [SearchVideoComponent]
})
export class AppModule {}
