/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit, NgZone} from '@angular/core';
import { Bookmark,BookmarkType } from './bookmark';
import { LocalBookmarkResolver } from './local/local-bookmark-resolver';
import {SafeUrl, SafeStyle, DomSanitizer} from '@angular/platform-browser';
import {Tag} from "./Tag";

@Component({
    selector: 'bookmarks',
    providers: [LocalBookmarkResolver],
    templateUrl: '../views/bookmarks_view.html'
})
export class BookmarksView implements OnInit {

    public values:Array<Bookmark>;
    public filteredValues:Array<Bookmark>;
    public availableTags:Array<Array<Tag>>;
    private selectedValue:string;
    private selectedTag:Tag;
    private googleDrivePath:string;

    constructor(private localBookmarkResolver:LocalBookmarkResolver, private sanitizer:DomSanitizer, private zone:NgZone) {
    }

    ngOnInit() {
        this.values = [];
        this.filteredValues = [];
        this.availableTags = [];
        this.getGoogleDrivePath().then(value=> {
            if (value != null) {
                this.googleDrivePath = value.replace(/\\/g, '/');
            }
        });
        this.localBookmarkResolver.findAll()
            .then(bookmarks => this.values = bookmarks)
            .then(bookmarks => this.filteredValues = bookmarks)
            .then(bookmarks => {
                let data:Tag[] = [];
                for (let value of bookmarks) {
                    data = _.union(data, value.tags);
                }

                for (let i = 0; i < data.length; i += 6) {
                    this.availableTags.push(data.slice(i, i + 6));
                }
            });

        let me:any = this;
        chrome.storage.onChanged.addListener(function (theChange:any, ns) {
            if (theChange.googleDrivePath != null) {
                if (theChange.googleDrivePath.newValue != null) {
                    me.googleDrivePath = theChange.googleDrivePath.newValue.replace(/\\/g, '/');
                }
                me.zone.run(() => {
                    console.log('Change detected, refreshing ...');
                });
            }
        });
    }

    onUpload(event:any, tag:Tag) {
        let me:any = this;
        let filesize:number = ((event.currentTarget.files[0].size / 1024) / 1024);
        let fileName:string = event.currentTarget.files[0].name.toLowerCase();

        if (filesize > 0.1 || (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg") && !fileName.endsWith(".gif"))) {
            Growl.settings.style = "warning";
            Growl.settings.size = "large";
            Growl.growl({title: "myBookmarks", message: "Invalid image size or extension!"});
            return;
        }

        let urlCleaner:DomSanitizer = this.sanitizer;
        tag.image = fileName;
        chrome.storage.sync.get('bookmarkImages', (items:any) => {
            if (items.bookmarkImages != undefined && items.bookmarkImages instanceof Array) {
                let index:any = -1;
                for (let item of items.bookmarkImages) {
                    if (item.name == tag.name) {
                        index = items.bookmarkImages.indexOf(item, 0);
                        break;
                    }
                }
                if (index > -1) {
                    items.bookmarkImages.splice(index, 1);
                }
                items.bookmarkImages.push(tag);
                items = items.bookmarkImages;
            } else {
                items = [];
                items.push(tag);
            }
            chrome.storage.sync.set({'bookmarkImages': items}, ()=> {
                console.info('Image saved in the storage!');
            });
        });
    }

    onChange(event:any) {
        this.selectedValue = event.target.value;

        if (this.selectedValue.trim().length == 0) {
            this.filteredValues = this.values;
        } else {
            let result:Array<Bookmark> = [];
            for (let value of this.filteredValues) {
                if (value.title.toLowerCase().indexOf(this.selectedValue.toLowerCase()) > -1) {
                    result.push(value);
                } else if (value.url.toLowerCase().indexOf(this.selectedValue.toLowerCase()) > -1) {
                    result.push(value);
                }
            }
            this.filteredValues = result;
        }
    }

    onTagClick(event:any, tag:Tag) {
        let result:Array<Bookmark> = [];
        for (let value of this.values) {
            if (_.contains(value.tags, tag)) {
                result.push(value);
            }
        }

        let wasActive:boolean = false;
        if (event.currentTarget.classList.contains('thin-border-active')) {
            wasActive = true;
        }
        let elements:NodeListOf<Element> = document.getElementsByClassName('clickable');
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('thin-border-active');
        }
        if (!wasActive) {
            event.currentTarget.classList.add('thin-border-active');
        }

        if (_.isEqual(result, this.filteredValues)) {
            this.filteredValues = this.values;
            this.selectedTag = null;
        } else {
            this.selectedTag = tag;
            this.filteredValues = result;
        }
    }

    openSettings(event:any) {
        chrome.tabs.create({'url': "/settings.html"});
    }

    refreshView(event:any) {

        if (this.selectedValue != undefined && this.selectedValue.trim().length == 0) {
            this.filteredValues = this.values;
        } else {
            this.localBookmarkResolver.find(this.selectedValue).then(bookmarks => this.filteredValues = bookmarks);
        }
    }

    cleanURL(url:string):SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl('chrome://favicon/' + url);
    }

    cleanStyle(image:string):SafeStyle {
        if (this.googleDrivePath != null && this.googleDrivePath.trim().length > 0) {
            return this.sanitizer.bypassSecurityTrustStyle('url("file:///' + this.googleDrivePath + '/' + image + '")');
        } else {
            return null;
        }
    }

    private getGoogleDrivePath():Promise<string> {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get('googleDrivePath', output => {
                resolve(output.googleDrivePath);
            });
        });
    }
}
