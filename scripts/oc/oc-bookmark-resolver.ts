import { Injectable } from 'angular2/core';
import { BookmarksResolver, Bookmark, BookmarkType } from './../bookmark';

@Injectable()

export class OcBookmarkResolver implements BookmarksResolver {
    public findAll():Promise<Array<Bookmark>> {
        return new Promise(function (resolve, reject) {

        });
    };

    public find(criteria:string):Promise<Array<Bookmark>> {
        return new Promise(function (resolve, reject) {

        });
    };
}