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

    constructor(private sanitizer:DomSanitizer){
        this.canRefresh = true;
    }

    public findAll():Promise<Array<Bookmark>> {
        let me:any = this;
        return new Promise(function(resolve, reject) {
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
        return new Promise(function(resolve, reject) {
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

/*    public findByTag(tagName:string):Promise<Array<Bookmark>> {
        let me:any = this;
        return new Promise(function(resolve, reject) {
            let result = [];
            chrome.bookmarks.search(tagName,
                bookmarkTreeNodes => {
                    for (let i = 0; i < bookmarkTreeNodes.length; i++) {
                        let node = bookmarkTreeNodes[i];
                        chrome.bookmarks.getChildren(node.id, subTreeNodes => {
                            for (let j = 0; j < subTreeNodes.length; j++) {
                                let level0 = subTreeNodes[j];
                                me.scanLocalBookmarks(level0, [], result);
                            }
                        });
                    }
                    resolve(result);
                }
            );
        });
    }*/

    public refresh():void {
       this.canRefresh = true;
    }

    private scanLocalBookmarks(bookmarkNode:any, parentTags:Tag[], result:Array<Bookmark>):void {
        if (bookmarkNode.url != undefined) {
            let favIco:SafeUrl = this.sanitizer.bypassSecurityTrustUrl('chrome://favicon/' + bookmarkNode.url);
            let bookmark = new Bookmark(bookmarkNode.url,favIco, bookmarkNode.title, parentTags, BookmarkType.LOCAL, '#91205a');

            result.push(bookmark);
        } else if (bookmarkNode.children != undefined) {
            let tempTag = parentTags.slice();
            let tag:Tag = new Tag(bookmarkNode.title, this.sanitizer.bypassSecurityTrustStyle('url(http://www.google.com)'));
            tempTag.push(tag);
            for (var n = 0; n < bookmarkNode.children.length; n++) {
                this.scanLocalBookmarks(bookmarkNode.children[n], tempTag, result);
            }
        }
    }
}
