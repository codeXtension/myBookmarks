/**
 * Created by elie on 06.07.2016.
 */
import { Injectable } from 'angular2/core';
import { BookmarksResolver, Bookmark, BookmarkType } from './bookmark';

@Injectable()

export class GoogleBookmarkResolver implements BookmarksResolver {

    private static CLIENT_ID:string = '1071613291540-f749747scb0ncduk7tol9pro2ccd9eu1.apps.googleusercontent.com';
    private static SCOPES:Array<string> = ['https://www.googleapis.com/auth/drive.appdata'];

    public findAll():Promise<Array<Bookmark>> {
        return new Promise(function (resolve, reject) {
            let result = [];
            GoogleBookmarkResolver.prototype.connect().then(function (result) {
                GoogleBookmarkResolver.prototype.retrieveFile().then(function (file) {
                    GoogleBookmarkResolver.prototype.delete(file.id).then(function (isDeleted) {
                        if (isDeleted) {
                            console.log('file deleted - ' + file.id);
                            GoogleBookmarkResolver.prototype.create().then(function (newFile) {
                                console.log('file created - ' + newFile.result.id);
                                GoogleBookmarkResolver.prototype.update(newFile.result.id, newFile.result).then(function (data) {
                                    GoogleBookmarkResolver.prototype.readContent(data.result.id).then(function (out) {
                                        console.log(out);
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });
    }

    public find(criteria:string):Promise<Array<Bookmark>> {
        return new Promise(function (resolve, reject) {

        });
    }

    private connect():Promise<boolean> {
        return new Promise(function (resolve, reject) {
            gapi.auth.authorize(
                {
                    'client_id': GoogleBookmarkResolver.CLIENT_ID,
                    'scope': GoogleBookmarkResolver.SCOPES.join(' '),
                    'immediate': true
                }).then(function (authResult:any) {
                if (authResult && !authResult.error) {
                    GoogleBookmarkResolver.prototype.loadDriveApi().then(function (result) {
                        resolve(true);
                    });
                } else {
                    resolve(false);
                }
            });
        });
    }

    private loadDriveApi():Promise<boolean> {
        return new Promise(function (resolve, reject) {
            gapi.client.load('drive', 'v3').then(function () {
                resolve(true);
            });
        });
    }

    private retrieveFile():Promise<any> {
        let request = gapi.client.drive.files.list({
            'spaces': 'appDataFolder',
            'pageSize': 10,
            'q': 'name = "bookmarks.json"',
            'fields': "nextPageToken, files(id, name, webContentLink)"
        });

        return new Promise(function (resolve, reject) {
            request.then(function (resp) {
                let files = resp.result.files;
                if (files && files.length > 0) {
                    let file = files[0];
                    if (files.length > 1) {
                        for (let i = 1; i < files.length; i++) {
                            let file = files[i];
                            GoogleBookmarkResolver.prototype.delete(file.id);
                        }
                    }
                    resolve(file);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    private delete(fileId:string):Promise<boolean> {
        return new Promise(function (resolve, reject) {
            gapi.client.drive.files.delete(
                {
                    "fileId": fileId
                }
            ).then(function (result) {
                resolve(true);
            });
        });
    };


    private update(fileId:string, appData:any):Promise<any> {
        return new Promise(function (resolve, reject) {
            return gapi.client.request({
                path: '/upload/drive/v3/files/' + fileId,
                method: 'PATCH',
                params: {
                    uploadType: 'media'
                },
                body: JSON.stringify(appData)
            }).then(function (data) {
                resolve(data);
            });
        });
    };


    private create():Promise<any> {
        return new Promise(function (resolve, reject) {
            gapi.client.drive.files.create(
                {
                    'fields': 'id, name, webContentLink',
                    resource: {
                        'name': 'bookmarks.json',
                        'parents': ['appDataFolder']
                    }
                }
            ).then(function (file) {
                resolve(file);
            });
        });
    };

    private readContent(fileId:string):Promise<string> {
        return new Promise(function (resolve, reject) {
            gapi.client.drive.files.get(
                {
                    'alt': 'media',
                    'fileId': fileId,
                    'fields': 'appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
                }
            ).then(function (file) {
                resolve(file.body);
            });
        });
    };
}