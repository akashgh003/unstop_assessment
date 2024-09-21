import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Required for ngModel

import { AppComponent } from './app.component';
import { SeatComponent } from './seat/seat.component';  // Ensure this is imported

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent  // Declare SeatComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
