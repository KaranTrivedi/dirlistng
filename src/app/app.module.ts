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
import { ApiService } from 'src/services/api.service';

// export class MyHammerConfig extends HammerGestureConfig  {
//   overrides = <any>{
//     'swipe': {velocity: 0.4, threshold: 20} // override default settings
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    DirectoryComponent,
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
    ApiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SearchVideoComponent]
})
export class AppModule {}
