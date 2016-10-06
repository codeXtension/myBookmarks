/**
 * Created by eelkhour on 28.09.2016.
 */
import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsView }   from './settings-view';
import {LocalSettings} from "./local/local-settings";
import {OcSettings} from "./oc/oc-settings";
import {GoogleSettings} from "./gd/google-settings";
import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [BrowserModule, HttpModule],
    declarations: [SettingsView, LocalSettings, OcSettings, GoogleSettings],
    bootstrap:    [SettingsView]
})
export class AppModule { }

// enableProdMode();
