/**
 * Created by elie on 06.10.2016.
 */
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'

@Injectable()

export class OcConnection {
    public static bookmarkUri :string = '/index.php/apps/bookmarks/public/rest/v1/bookmark';
    public static  ADD_URI: string = '/index.php/apps/bookmarks/public/rest/v1/bookmark/add';
    public static UPDATE_URI: string = '/index.php/apps/bookmarks/public/rest/v1/bookmark/update';
    public static DELETE_URI: string = '/index.php/apps/bookmarks/public/rest/v1/bookmark/delete';

    constructor(public http: Http) {

    }

    public validateCredentials(username:string, password:string, serverUrl:string):Promise<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic ' + window.btoa(username + ":" + password));
        let me = this;
        return new Promise(function(resolve, reject) {
            me.http.post(serverUrl + OcConnection.bookmarkUri,
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