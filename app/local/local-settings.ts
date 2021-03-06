/**
 * Created by elie on 26.09.2016.
 */

import { Component, OnInit } from '@angular/core';
import { LocalBookmarkResolver } from './local-bookmark-resolver';

@Component({
    selector: 'localSettings',
    providers: [LocalBookmarkResolver],
    templateUrl: '../views/local_settings.html'
})

export class LocalSettings implements OnInit {

    public display:boolean;
    public staticCloud:boolean;

    constructor(private localBookmarkResolver:LocalBookmarkResolver) {
    }

    ngOnInit() {
        this.display = true;
        this.staticCloud = false;
    }
}