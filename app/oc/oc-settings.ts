/**
 * Created by elie on 26.09.2016.
 */

import { Component, OnInit } from '@angular/core';
import { OcBookmarkResolver } from './oc-bookmark-resolver';

@Component({
    selector: 'ocSettings',
    providers: [OcBookmarkResolver],
    templateUrl: '../views/oc_settings.html'
})

export class OcSettings implements OnInit {


    constructor(private ocBookmarkResolver:OcBookmarkResolver) {
    }

    ngOnInit() {
    }
}