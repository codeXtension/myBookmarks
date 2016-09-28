/**
 * Created by eelkhour on 28.09.2016.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BookmarksView }   from './bookmarks-view';

@NgModule({
    imports:      [BrowserModule],
    declarations: [BookmarksView],
    bootstrap:    [BookmarksView]
})
export class AppModule { }