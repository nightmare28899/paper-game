import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ModalRulesComponent } from './modal-rules/modal-rules.component';
import { ModalOptionsComponent } from './modal-options/modal-options.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalRulesComponent,
    ModalOptionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
