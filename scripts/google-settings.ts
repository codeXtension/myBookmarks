/**
 * Created by elie on 25.09.2016.
 */


import { Component, OnInit } from 'angular2/core';
import { Bookmark,BookmarkType } from './bookmark';
import { GoogleBookmarkResolver } from './google-bookmark-resolver';

@Component({
    selector: 'googleSettings',
    providers: [GoogleBookmarkResolver],
    templateUrl: '../templates/googleSettings.html'
})

/// <reference path="./lib/chrome.d.ts"/>
export class GoogleSettings implements OnInit {

    constructor(private googleBookmarkResolver:GoogleBookmarkResolver) {

    }

    ngOnInit() {
    }

    authorize(event : any) {
        this.googleBookmarkResolver.connect();
    }
}