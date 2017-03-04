/**
 * Created by elie on 04.03.2017.
 */
import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsView }   from './settings-view';
import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [BrowserModule, HttpModule],
    declarations: [SettingsView],
    bootstrap:    [SettingsView]
})
export class AppModule { }

// enableProdMode();
