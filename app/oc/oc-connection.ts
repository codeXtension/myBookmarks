/**
 * Created by elie on 06.10.2016.
 */
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {OcCredentials} from './oc-credentials';

@Injectable()

export class OcConnection {
    public static bookmarkUri :string = '/index.php/apps/bookmarks/public/rest/v1/bookmark';
    public static  ADD_URI: string = '/index.php/apps/bookmarks/public/rest/v1/bookmark/add';
    public static UPDATE_URI: string = '/index.php/apps/bookmarks/public/rest/v1/bookmark/update';
    public static DELETE_URI: string = '/index.php/apps/bookmarks/public/rest/v1/bookmark/delete';

    constructor(public http: Http) {

    }

    public validateCredentials(credentials:OcCredentials):Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + window.btoa(credentials.username + ":" + credentials.password));
        let me = this;
        return new Promise(function(resolve, reject) {
            me.http.post(credentials.serverUrl + OcConnection.bookmarkUri,
                '',
                {headers: headers}
            ).subscribe(
                data => {
                    resolve(true);
                },
                err => {
                    resolve(false);
                });
        });

    }

}
