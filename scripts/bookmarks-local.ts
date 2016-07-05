/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit } from '../node_modules/angular2/core.d';
import { Bookmark,BookmarkType } from './bookmark';

@Component({
    selector: 'bookmarks',
    template: `
    <ul class="list-group">
        <li *ngFor="let b of values" class="list-group-item">
                        <img src=""/>&nbsp;
                        <a title="{{b.title}}" href="{{b.url}}" target="_blank">{{b.title}}</a>
        </li>
    </ul>
    `
})
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="./lib/chrome.d.ts"/>
export class BookmarksLocal implements OnInit {
    public values:Array<Bookmark>;

    constructor() {

    }

    ngOnInit() {
        this.values = new Array<Bookmark>();
        this.values.push(new Bookmark('asd', 'asd', [], BookmarkType.OWN_CLOUD, ''));
        this.retrieveBookmarks().then(bookmarks => this.values = bookmarks);
    }

    private retrieveBookmarks():any {
        let result = new Array<Bookmark>();
        chrome.bookmarks.getTree(
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes[0].children && bookmarkTreeNodes[0].children[0].children) {
                    for (let i = 0; i < bookmarkTreeNodes[0].children[0].children.length; i++) {
                        let level0 = bookmarkTreeNodes[0].children[0].children[i];
                        BookmarksLocal.prototype.scanLocalBookmarks(level0, [], result);
                    }
                }
                return Promise.resolve(result);
            }
        );
    }

    private scanLocalBookmarks(bookmarkNode:any, parentTags:any, result:Array<Bookmark>):void {
        if (bookmarkNode.url != undefined) {
            let bookmark = new Bookmark(bookmarkNode.url, bookmarkNode.title, parentTags, BookmarkType.LOCAL, '#91205a');

            result.push(bookmark);
        } else if (bookmarkNode.children != undefined) {
            let tempTag = parentTags.slice();
            tempTag.push(bookmarkNode.title);
            for (var n = 0; n < bookmarkNode.children.length; n++) {
                this.scanLocalBookmarks(bookmarkNode.children[n], tempTag, result);
            }
        }
    }
}