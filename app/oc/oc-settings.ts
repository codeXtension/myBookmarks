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
    public credentials:OcCredentials;

    constructor(private ocBookmarkResolver:OcBookmarkResolver, private ocConnection: OcConnection) {
      this.credentials = new OcCredentials('','','');
    }

    ngOnInit() {
        this.isConnected = null;
        this.loadCredentials().then(data => {
          if(data.username != undefined){
            this.credentials = data
          }
        });
    }

    public validateCredentials():void{
        let me = this;

        this.ocConnection.validateCredentials(this.credentials).then(function(data){
            me.isConnected = data;
            if(data) {
              me.saveCredentials(this.credentials);
            }
        });
    }

    public clearCredentials():void {
      chrome.storage.sync.set({'bookmarksData': {}}, function () {
                console.info('Data cleared with success!');
            });
    }

    private saveCredentials(credentials:OcCredentials):void{
        chrome.storage.sync.set({'bookmarksData': credentials}, function () {
                  console.info('Data saved with success!');
              });
    }

    public loadCredentials():Promise<OcCredentials>{
        return new Promise(function(resolve, reject){
          chrome.storage.sync.get('bookmarksData', function (item:any) {
                      resolve(item.bookmarksData);
                  });
        });
    }
}
