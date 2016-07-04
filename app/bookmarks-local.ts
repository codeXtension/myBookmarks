/**
 * Created by elie on 04.07.2016.
 */
import { Component } from '@angular/core';
import { Bookmark,BookmarkType } from './bookmark';

@Component({
    selector: 'bookmarks',
    template: `
        <p>number of bookmaks: {{values}}</p>
    `
})

/// <reference path="./lib/chrome.d.ts"/>
export class BookmarksLocal {
    values:Array<Bookmark>;

    constructor() {
        this.values = [];
        chrome.bookmarks.getTree(
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes[0].children && bookmarkTreeNodes[0].children[0].children) {
                    for (let i = 0; i < bookmarkTreeNodes[0].children[0].children.length; i++) {
                        let level0 = bookmarkTreeNodes[0].children[0].children[i];
                        BookmarksLocal.prototype.scanLocalBookmarks(level0, []);
                    }
                }
            }
        );
    }

    scanLocalBookmarks(bookmarkNode, parentTags) {
        if (bookmarkNode.url != undefined) {
            let bookmark = new Bookmark(bookmarkNode.url, bookmarkNode.title, parentTags, BookmarkType.LOCAL, '#91205a');

            this.values.push(bookmark);
        } else if (bookmarkNode.children != undefined) {
            let tempTag = parentTags.slice();
            tempTag.push(bookmarkNode.title);
            for (var n = 0; n < bookmarkNode.children.length; n++) {
                BookmarksLocal.prototype.scanLocalBookmarks(bookmarkNode.children[n], tempTag);
            }
        }
    }
}