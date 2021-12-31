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
import {ClipboardModule} from '@angular/cdk/clipboard';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

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

// import { NgxEchartsModule } from 'ngx-echarts';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartsModule } from "@carbon/charts-angular";
import { HoldingsPieComponent } from './stockticker/player/holdings-pie/holdings-pie.component';
import { PlayerComponent } from './stockticker/player/player.component';
import { WorthPieComponent } from './stockticker/player/worth-pie/worth-pie.component';

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
        WorthPieComponent
      ],
      imports: [
        // NgxEchartsModule.forRoot({
          //     echarts: () => import('echarts'),
          // }),
          // NgxChartsModule,
          
        ChartsModule,

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
