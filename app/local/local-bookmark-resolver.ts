/**
 * Created by elie on 06.07.2016.
 */
import { Injectable } from '@angular/core';
import { BookmarksResolver, Bookmark, BookmarkType } from './../bookmark';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';
import {Tag} from "../Tag";

@Injectable()

export class LocalBookmarkResolver implements BookmarksResolver {
    private canRefresh:boolean;
    private allImageTags:Array<Tag>;
    private googleDrivePath:string;

    constructor(private sanitizer:DomSanitizer) {
        this.canRefresh = true;
        this.findAllImages().then(tags => {
            this.allImageTags = tags;
        });

        this.getGoogleDrivePath().then(value=> {
            this.googleDrivePath = value.replace(/\\/g, '/');
        });
    }

    public findAll():Promise<Array<Bookmark>> {
        let me:any = this;
        return new Promise(function (resolve, reject) {
            let result = [];
            chrome.bookmarks.getTree(
                bookmarkTreeNodes => {
                    if (bookmarkTreeNodes[0].children && bookmarkTreeNodes[0].children[0].children) {
                        for (let i = 0; i < bookmarkTreeNodes[0].children[0].children.length; i++) {
                            let level0 = bookmarkTreeNodes[0].children[0].children[i];
                            me.scanLocalBookmarks(level0, [], result);
                        }
                    }
                    resolve(result);
                }
            );
        });
    }

    public find(criteria:string):Promise<Array<Bookmark>> {
        let me:any = this;
        return new Promise(function (resolve, reject) {
            let result = [];
            chrome.bookmarks.search(criteria,
                bookmarkTreeNodes => {
                    for (let i = 0; i < bookmarkTreeNodes.length; i++) {
                        let level0 = bookmarkTreeNodes[i];
                        me.scanLocalBookmarks(level0, [], result);
                    }
                    resolve(result);
                }
            );
        });
    }

    public refresh():void {
        this.canRefresh = true;
    }

    private scanLocalBookmarks(bookmarkNode:any, parentTags:Tag[], result:Array<Bookmark>):void {
        if (bookmarkNode.url != undefined) {
            let favIco:SafeUrl = this.sanitizer.bypassSecurityTrustUrl('chrome://favicon/' + bookmarkNode.url);
            let bookmark = new Bookmark(bookmarkNode.url, favIco, bookmarkNode.title, parentTags, BookmarkType.LOCAL, '#91205a');

            result.push(bookmark);
        } else if (bookmarkNode.children != undefined) {
            let tempTag = parentTags.slice();

            let url:string = '';
            if (this.allImageTags != null) {
                for (let t of this.allImageTags) {
                    if (t.name == bookmarkNode.title) {
                        url = t.image;
                        break;
                    }
                }
            }
            let tag:Tag = new Tag(bookmarkNode.title, url);
            tempTag.push(tag);
            for (var n = 0; n < bookmarkNode.children.length; n++) {
                this.scanLocalBookmarks(bookmarkNode.children[n], tempTag, result);
            }
        }
    }

    private findAllImages():Promise<Array<Tag>> {
        return new Promise(function (resolve, reject) {
            chrome.storage.sync.get('bookmarkImages', (items:any) => {
                if (items.bookmarkImages != undefined) {
                    resolve(items.bookmarkImages);
                }
                resolve(null);
            });
        });
    }

    private getGoogleDrivePath():Promise<string> {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get('googleDrivePath', output => {
                resolve(output.googleDrivePath);
            });
        });
    }
}
