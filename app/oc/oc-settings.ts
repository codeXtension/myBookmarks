/**
 * Created by elie on 26.09.2016.
 */

import { Component, OnInit } from '@angular/core';
import { OcBookmarkResolver } from './oc-bookmark-resolver';
import { OcConnection } from './oc-connection';
import {PromiseObservable} from "rxjs/observable/PromiseObservable";
import {OcCredentials} from './oc-credentials';

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
        let credentials:OcCredentials = new OcCredentials(user, pwd, url);

        this.ocConnection.validateCredentials(credentials).then(function(data){
            me.isConnected = data;
        });
    }

    public saveCredentials(credentials:OcCredentials):void{

    }

    public loadCredentials():Promise<any>{
        return new Promise(function(resolve, reject){

        });
    }
}
