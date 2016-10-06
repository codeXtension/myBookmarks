/**
 * Created by elie on 26.09.2016.
 */

import { Component, OnInit } from '@angular/core';
import { OcBookmarkResolver } from './oc-bookmark-resolver';
import { OcConnection } from './oc-connection';
import {PromiseObservable} from "rxjs/observable/PromiseObservable";

@Component({
    selector: 'ocSettings',
    providers: [OcBookmarkResolver, OcConnection],
    templateUrl: '../views/oc_settings.html'
})

export class OcSettings implements OnInit {
    public isConnected:boolean;

    constructor(private ocBookmarkResolver:OcBookmarkResolver, private ocConnection: OcConnection) {
    }

    ngOnInit() {
        this.isConnected = null;
    }

    public validateCredentials(user:string, pwd:string, url:string):void{
        let me = this;
        this.ocConnection.validateCredentials(user, pwd, url).then(function(data){
            me.isConnected = data;
        });
    }

    public saveCredentials(user:string, pwd:string, url:string):void{

    }

    public loadCredentials():Promise<any>{
        return new Promise(function(resolve, reject){

        });
    }
}