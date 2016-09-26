/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import { Component, OnInit, enableProdMode } from 'angular2/core';
import { bootstrap }    from 'angular2/platform/browser';
import { GoogleSettings } from './gd/google-settings';
import { OcSettings } from './oc/oc-settings';
import { LocalSettings } from './local/local-settings';

@Component({
    selector: 'settings',
    templateUrl: '../templates/settingsTabloid.html',
    directives: [GoogleSettings,OcSettings,LocalSettings]
})
/// <reference path="./lib/chrome.d.ts"/>
export class SettingsView implements OnInit {

    ngOnInit() {

    }
}
enableProdMode();

bootstrap(SettingsView);
