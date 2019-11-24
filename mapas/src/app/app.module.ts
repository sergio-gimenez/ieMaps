import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InitialFormComponent } from './initial-form/initial-form.component';


@NgModule({
  declarations: [AppComponent, MainPageComponent, InitialFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9R2jg0AERETo2MTHyEHqQTLS06hc7sM0'
    }),
    AppRoutingModule
  ],
  providers: [],
  exports: [AppRoutingModule, MainPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
