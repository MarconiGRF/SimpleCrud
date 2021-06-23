import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WarnviewComponent } from './warnview/warnview.component';
import { WarnentryComponent } from './sidebar/warnentry/warnentry.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WarnviewComponent,
    WarnentryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
