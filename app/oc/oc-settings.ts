/**
 * Created by elie on 26.09.2016.
 */

import { Component, OnInit } from 'angular2/core';
import { OcBookmarkResolver } from './oc-bookmark-resolver';

@Component({
    selector: 'ocSettings',
    providers: [OcBookmarkResolver],
    templateUrl: '../views/oc_settings.html'
})

/// <reference path="./../lib/chrome.d.ts"/>
export class OcSettings implements OnInit {


    constructor(private ocBookmarkResolver:OcBookmarkResolver) {
    }

    ngOnInit() {
    }
}