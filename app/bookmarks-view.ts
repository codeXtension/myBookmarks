/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit } from 'angular2/core';
import { Bookmark,BookmarkType } from './bookmark';
import { LocalBookmarkResolver } from './local/local-bookmark-resolver';
import { GoogleBookmarkResolver } from './gd/google-bookmark-resolver';

@Component({
    selector: 'bookmarks',
    providers: [LocalBookmarkResolver,GoogleBookmarkResolver],
    templateUrl: '../templates/bookmarksList.html'
})

/// <reference path="./lib/chrome.d.ts"/>
export class BookmarksView implements OnInit {

    public values:Array<Bookmark>;

    constructor(private localBookmarkResolver:LocalBookmarkResolver, private googleBookmarkResolver:GoogleBookmarkResolver) {

    }

    ngOnInit() {
        this.values = [];
        this.localBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
    }

    onChange(event: any){
        let value = event.target.value;

        if(value.trim().length==0){
            this.localBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
        } else{
            this.localBookmarkResolver.find(value).then(bookmarks => this.values = bookmarks);
        }
    }

    openSettings(event: any) {
        chrome.tabs.create({'url': "/settings.html"});
    }
}