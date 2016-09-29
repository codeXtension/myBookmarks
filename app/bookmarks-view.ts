/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { Bookmark,BookmarkType } from './bookmark';
import { LocalBookmarkResolver } from './local/local-bookmark-resolver';
import { GoogleBookmarkResolver } from './gd/google-bookmark-resolver';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'bookmarks',
    providers: [LocalBookmarkResolver, GoogleBookmarkResolver],
    templateUrl: '../views/bookmarks_view.html'
})
export class BookmarksView implements OnInit {

    public values:Array<Bookmark>;
    private selectedValue:string;

    constructor(private localBookmarkResolver:LocalBookmarkResolver, private googleBookmarkResolver:GoogleBookmarkResolver, private sanitizer:DomSanitizer) {

    }

    ngOnInit() {
        this.values = [];
        this.localBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
    }

    onChange(event:any) {
        this.selectedValue = event.target.value;

        if (this.selectedValue.trim().length == 0) {
            this.localBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
        } else {
            this.localBookmarkResolver.find(this.selectedValue).then(bookmarks => this.values = bookmarks);
        }
    }

    openSettings(event:any) {
        chrome.tabs.create({'url': "/settings.html"});
    }

    refreshView(event:any) {
        this.googleBookmarkResolver.refresh();

        if (this.selectedValue != undefined && this.selectedValue.trim().length == 0) {
            this.localBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
        } else {
            this.localBookmarkResolver.find(this.selectedValue).then(bookmarks => this.values = bookmarks);
        }
    }

    cleanURL(url:string):SafeUrl{
        return this.sanitizer.bypassSecurityTrustUrl('chrome://favicon/' + url);
    }
}
