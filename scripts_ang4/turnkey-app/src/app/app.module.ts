import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // required for modals

import { FuncConfigService } from './services/funcconfig.service';
import { IdentityService } from './services/identity.service';
import { CommandService } from './services/command.service';


import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component';
import { OptionsTabComponent } from './options-tab/options-tab.component';


@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    OptionsTabComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule

  ],
  entryComponents: [ProgressComponent],
  providers: [FuncConfigService, CommandService, IdentityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
