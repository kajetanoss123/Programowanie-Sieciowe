import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GraphComponent } from './graph.component/graph.component';
import { MaterialModule } from './MaterialModule';
import { ActualValueComponent } from './actual-value.component/actual-value.component';
import { ControlComponent } from './control.component/control.component';
import { LogComponent } from './log.component/log.component';
import {ChartsModule} from 'ng2-charts';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SettingsComponent } from './settings.component/settings.component';
import { ActualValueNucleoComponent } from './actual-value-nucleo/actual-value-nucleo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    GraphComponent,
    ActualValueComponent,
    ControlComponent,
    LogComponent,
    SettingsComponent,
    ActualValueNucleoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ChartsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
