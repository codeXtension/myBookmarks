/**
 * Created by elie on 06.07.2016.
 */
import { Injectable } from 'angular2/core';
import { BookmarksResolver, Bookmark, BookmarkType } from './bookmark';

@Injectable()

export class GoogleBookmarkResolver implements BookmarksResolver {

    private static CLIENT_ID: string = '1071613291540-f749747scb0ncduk7tol9pro2ccd9eu1.apps.googleusercontent.com';
    private static SCOPES: Array<string> = ['https://www.googleapis.com/auth/drive.appdata'];

    public findAll():Promise<Array<Bookmark>> {
        return new Promise(function(resolve, reject) {
            let result = [];
            GoogleBookmarkResolver.prototype.connectToGoogleDrive();
        });
    }

    public find(criteria:string):Promise<Array<Bookmark>> {
        return new Promise(function(resolve, reject) {

        });
    }

    private connectToGoogleDrive():void {
        gapi.auth.authorize(
            {
                'client_id': GoogleBookmarkResolver.CLIENT_ID,
                'scope': GoogleBookmarkResolver.SCOPES.join(' '),
                'immediate': true
            }, GoogleBookmarkResolver.prototype.handleAuthResult);
    }

    private loadDriveApi():void {
        gapi.client.load('drive', 'v3').then(function(){
            GoogleBookmarkResolver.prototype.listFiles();
        });
    }

    private handleAuthResult(authResult:any):void {
        if (authResult && !authResult.error) {
            GoogleBookmarkResolver.prototype.loadDriveApi();
        }
    }

    private listFiles():void {
    let request = gapi.client.drive.files.list({
        'spaces': 'appDataFolder',
        'pageSize': 10,
        'q': 'name = "bookmarks.json"',
        'fields': "nextPageToken, files(id, name, webContentLink)"
    });

    request.then(function(resp) {
        let files = resp.result.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
            }
        }
    });
}
}