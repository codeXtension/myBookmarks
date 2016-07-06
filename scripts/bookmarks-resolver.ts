/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit } from 'angular2/core';
import { Bookmark,BookmarkType } from './bookmark';
import { LocalBookmarkResolver } from './local-bookmark-resolver';

@Component({
    selector: 'bookmarks',
    providers: [LocalBookmarkResolver],
    template: `
    <div class="list-group bookmark-scrollable bookmarkList">
      <a *ngFor="#b of values" href="{{b.url}}" title="{{b.title}}" target="_blank" class="list-group-item square-border">
      <img src="chrome://favicon/{{b.url}}"/>&nbsp;{{b.title}}
      </a>
    </div>
    `
})

/// <reference path="./lib/chrome.d.ts"/>
export class BookmarksResolver implements OnInit {
    public values:Array<Bookmark>;

    constructor(private localBookmarkResolver:LocalBookmarkResolver) {

    }

    ngOnInit() {
        this.values = new Array<Bookmark>();
        this.localBookmarkResolver.findAll().then(bookmarks => this.values = bookmarks);
    }
}