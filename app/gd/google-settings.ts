/**
 * Created by elie on 25.09.2016.
 */


import { Component, OnInit, Input } from '@angular/core';
import { GoogleBookmarkResolver } from './google-bookmark-resolver';

@Component({
    selector: 'googleSettings',
    inputs: ['connected'],
    providers: [GoogleBookmarkResolver],
    templateUrl: '../views/google_settings.html'
})

export class GoogleSettings implements OnInit {

    public connected:boolean;

    constructor(private googleBookmarkResolver:GoogleBookmarkResolver) {
    }

    ngOnInit() {
        this.connected = false;
    }

    authorize(event : any) {
        this.connected = true;
        this.googleBookmarkResolver.authorize().then(isConnected => this.connected = isConnected);
    }
}