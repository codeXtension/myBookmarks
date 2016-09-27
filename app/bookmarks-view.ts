/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit, enableProdMode } from 'angular2/core';
import { Bookmark,BookmarkType } from './bookmark';
import { LocalBookmarkResolver } from './local/local-bookmark-resolver';
import { GoogleBookmarkResolver } from './gd/google-bookmark-resolver';
import { bootstrap }    from 'angular2/platform/browser';

@Component({
    selector: 'bookmarks',
    providers: [LocalBookmarkResolver,GoogleBookmarkResolver],
    templateUrl: '../views/bookmarks_view.html'
})

/// <reference path="./lib/chrome.d.ts"/>
export class BookmarksView implements OnInit {

    public values:Array<Bookmark>;
    private selectedValue:string;

    constructor(private localBookmarkResolver:LocalBookmarkResolver, private googleBookmarkResolver:GoogleBookmarkResolver) {

    }

    ngOnInit() {
        this.values = [];
        this.googleBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
    }

    onChange(event: any){
        this.selectedValue = event.target.value;

        if(this.selectedValue.trim().length==0){
            this.googleBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
        } else{
            this.googleBookmarkResolver.find(this.selectedValue).then(bookmarks => this.values = bookmarks);
        }
    }

    openSettings(event: any) {
        chrome.tabs.create({'url': "/settings.html"});
    }

    refreshView(event: any){
        this.googleBookmarkResolver.refresh().then(function(){
            if(this.selectedValue.trim().length==0){
                this.googleBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
            } else{
                this.googleBookmarkResolver.find(this.selectedValue).then(bookmarks => this.values = bookmarks);
            }
        });
    }
}
enableProdMode();
bootstrap(BookmarksView);
