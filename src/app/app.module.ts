import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QueryBuilderModule } from 'angular2-query-builder';

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    QueryBuilderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
