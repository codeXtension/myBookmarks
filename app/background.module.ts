/**
 * Created by elie on 09.12.2016.
 */
import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BackgroundService }   from './background-service';
import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [BrowserModule, HttpModule],
    declarations: [BackgroundService],
    bootstrap:    [BackgroundService]
})
export class AppModule { }

// enableProdMode();
