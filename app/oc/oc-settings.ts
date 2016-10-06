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
        this.loadCredentials();
    }

    public validateCredentials(user:string, pwd:string, url:string):void{
        let me = this;
        let credentials:OcCredentials = new OcCredentials(user, pwd, url);

        this.ocConnection.validateCredentials(credentials).then(function(data){
            me.isConnected = data;
            if(data) {
              me.saveCredentials(credentials);
            }
        });
    }

    private saveCredentials(credentials:OcCredentials):void{
        chrome.storage.sync.set({'bookmarksData': credentials}, function () {
                  console.info('Data saved with success!');
              });
    }

    public loadCredentials():Promise<OcCredentials>{
        return new Promise(function(resolve, reject){
          chrome.storage.sync.get('bookmarksData', function (item) {
                      console.info(item);
                      resolve(item);
                  });
        });
    }
}
