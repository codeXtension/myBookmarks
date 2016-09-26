/**
 * Created by elie on 25.09.2016.
 */


import { Component, OnInit } from 'angular2/core';
import { GoogleBookmarkResolver } from './google-bookmark-resolver';

@Component({
    selector: 'googleSettings',
    providers: [GoogleBookmarkResolver],
    templateUrl: '../templates/googleSettings.html'
})

/// <reference path="./../lib/chrome.d.ts"/>
export class GoogleSettings implements OnInit {

    public connected:boolean;

    constructor(private googleBookmarkResolver:GoogleBookmarkResolver) {
        this.connected = false;
    }

    ngOnInit() {
        this.googleBookmarkResolver.connect().then(isConneced => this.connected = isConneced);
    }

    authorize(event : any) {
        this.googleBookmarkResolver.authorize().then(isConnected => this.connected = isConnected);
    }
}