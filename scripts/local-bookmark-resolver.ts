/**
 * Created by elie on 06.07.2016.
 */
import { Injectable } from 'angular2/core';
import { BookmarksResolver, Bookmark, BookmarkType } from './bookmark';

@Injectable()

export class LocalBookmarkResolver implements BookmarksResolver {

    public findAll():any {
        let result = new Array<Bookmark>();
        chrome.bookmarks.getTree(
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes[0].children && bookmarkTreeNodes[0].children[0].children) {
                    for (let i = 0; i < bookmarkTreeNodes[0].children[0].children.length; i++) {
                        let level0 = bookmarkTreeNodes[0].children[0].children[i];
                        LocalBookmarkResolver.prototype.scanLocalBookmarks(level0, [], result);
                    }
                }
            }
        );
        return Promise.resolve(result);
    }

    public find(criteria:string):any {
        let result = new Array<Bookmark>();
        chrome.bookmarks.search(criteria,
            function (bookmarkTreeNodes) {
                if (bookmarkTreeNodes[0].children && bookmarkTreeNodes[0].children[0].children) {
                    for (let i = 0; i < bookmarkTreeNodes[0].children[0].children.length; i++) {
                        let level0 = bookmarkTreeNodes[0].children[0].children[i];
                        LocalBookmarkResolver.prototype.scanLocalBookmarks(level0, [], result);
                    }
                }
            }
        );
        return Promise.resolve(result);
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