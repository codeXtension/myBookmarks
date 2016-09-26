/**
 * Created by elie on 25.09.2016.
 */


import { Component, OnInit, Input } from 'angular2/core';
import { GoogleBookmarkResolver } from './google-bookmark-resolver';

@Component({
    selector: 'googleSettings',
    inputs: ['header'],
    providers: [GoogleBookmarkResolver],
    templateUrl: '../templates/googleSettings.html'
})

/// <reference path="./../lib/chrome.d.ts"/>
export class GoogleSettings implements OnInit {

    public connected:boolean;
    public header:boolean;

    constructor(private googleBookmarkResolver:GoogleBookmarkResolver) {
        this.connected = false;
    }

    ngOnInit() {
        this.googleBookmarkResolver.connect().then(data => this.connected = data);
    }

    authorize(event : any) {
        this.googleBookmarkResolver.authorize().then(isConnected => this.connected = isConnected);
    }

    isConnected() {
        this.googleBookmarkResolver.connect().then(data => this.connected = data);
    }
}