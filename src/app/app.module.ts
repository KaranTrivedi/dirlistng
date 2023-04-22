import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectoryComponent } from './directory/directory.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './vertical-nav/vertical-nav.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {ClipboardModule} from '@angular/cdk/clipboard';

import {MatExpansionModule} from '@angular/material/expansion';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { VideoPopupComponent } from './video-popup/video-popup.component';
import { ImagesComponent } from './images/images.component';
import {MatSortModule} from '@angular/material/sort';
import { TestSamplesComponent } from './test-samples/test-samples.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DEFAULT_OPTIONS as MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/legacy-dialog';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { ApiService } from 'src/services/api.service';
// import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';

import { en_US } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';

import en from '@angular/common/locales/en';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { StocktickerComponent } from './stockticker/stockticker.component';
import { ValGraphComponent } from './stockticker/val-graph/val-graph.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSliderModule } from 'ng-zorro-antd/slider';

// import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from "@carbon/charts-angular";

import { HoldingsPieComponent } from './stockticker/player/holdings-pie/holdings-pie.component';
import { PlayerComponent } from './stockticker/player/player.component';
import { WorthPieComponent } from './stockticker/player/worth-pie/worth-pie.component';
import { StandingsComponent } from './stockticker/player/standings/standings.component';
import { BlankComponent } from './blank/blank.component';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { TestComponent } from './test/test.component';

import { PlotlyViaCDNModule } from 'angular-plotly.js';

PlotlyViaCDNModule.setPlotlyVersion('latest'); // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.setPlotlyBundle(null); // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        DirectoryComponent,
        SearchComponent,
        HeaderComponent,
        VideoPopupComponent,
        ImagesComponent,
        TestSamplesComponent,
        StocktickerComponent,
        ValGraphComponent,
        HoldingsPieComponent,
        PlayerComponent,
        WorthPieComponent,
        StandingsComponent,
        BlankComponent,
        TestComponent
      ],
      imports: [
        // NgxEchartsModule.forRoot({
        //       echarts: () => import('echarts'),
        //   }),
        // NgxJsonViewerModule,

        NzCollapseModule,

        PlotlyViaCDNModule,

        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,

        NgxChartsModule,
        ChartsModule,

        NzSliderModule,
        NzDropDownModule,
        NzTableModule,
        NzMessageModule,
        NzLayoutModule,
        NzFormModule,
        NzIconModule,
        NzButtonModule,
        NzInputModule,
        NzDatePickerModule,
        NzBreadCrumbModule,
        NzDividerModule,
        // MatCardModule,
        ClipboardModule,
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
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        ApiService,
        { provide: NZ_I18N, useValue: en_US },
        // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {}}
      ],
      bootstrap: [AppComponent]
})
export class AppModule {}
