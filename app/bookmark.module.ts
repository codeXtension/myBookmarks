/**
 * Created by eelkhour on 28.09.2016.
 */
import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BookmarksView }   from './bookmarks-view';
import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [BrowserModule, HttpModule],
    declarations: [BookmarksView],
    bootstrap:    [BookmarksView]
})
export class AppModule { }

// enableProdMode();
