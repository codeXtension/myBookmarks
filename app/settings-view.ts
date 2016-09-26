/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import { Component, OnInit, enableProdMode } from 'angular2/core';
import { bootstrap }    from 'angular2/platform/browser';
import { GoogleSettings } from './gd/google-settings';
import { OcSettings } from './oc/oc-settings';
import { LocalSettings } from './local/local-settings';
import { GoogleBookmarkResolver } from './gd/google-bookmark-resolver';

@Component({
    selector: 'settings',
    templateUrl: '../templates/settingsTabloid.html',
    providers: [GoogleBookmarkResolver],
    directives: [GoogleSettings,OcSettings,LocalSettings]
})
/// <reference path="./lib/chrome.d.ts"/>
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
enableProdMode();

bootstrap(SettingsView);
