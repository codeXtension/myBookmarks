import { Component, OnInit } from '@angular/core';
import { GoogleBookmarkResolver } from './gd/google-bookmark-resolver';
import {LocalSettings} from "./local/local-settings";
import {GoogleSettings} from "./gd/google-settings";
import {OcSettings} from "./oc/oc-settings";

@Component({
    selector: 'settings',
    templateUrl: '../views/settings_view.html',
    providers: [GoogleBookmarkResolver]
})
export class SettingsView implements OnInit {
    public connected:boolean;

    ngOnInit() {

    }

    constructor(private googleBookmarkResolver:GoogleBookmarkResolver) {
        this.connected = false;
    }

    isConnected(event:any) {
        console.debug("checking if SettingsView.isConnected()");
        this.googleBookmarkResolver.connect().then(data => this.connected = data);
    }
}


