import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory/directory.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './vertical-nav/vertical-nav.component';

import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import {MatExpansionModule} from '@angular/material/expansion';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { ImagesComponent } from './images/images.component';
import {MatSortModule} from '@angular/material/sort';
import { TestSamplesComponent } from './test-samples/test-samples.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ApiService } from 'src/services/api.service';
// import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    DirectoryComponent,
    SearchComponent,
    HeaderComponent,
    VideoPopupComponent,
    ImagesComponent,
    TestSamplesComponent
  ],
  imports: [
    // MatCardModule,
    MatToolbarModule,
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
    ApiService,
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [VideoPopupComponent]
})
export class AppModule {}
