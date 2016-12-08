/**
 * Created by elie on 04.07.2016.
 */

import { Component, OnInit } from '@angular/core';
import { Bookmark,BookmarkType } from './bookmark';
import { LocalBookmarkResolver } from './local/local-bookmark-resolver';
import { GoogleBookmarkResolver } from './gd/google-bookmark-resolver';
import {SafeUrl, DomSanitizer} from '@angular/platform-browser';
import {Tag} from "./Tag";

@Component({
    selector: 'bookmarks',
    providers: [LocalBookmarkResolver, GoogleBookmarkResolver],
    templateUrl: '../views/bookmarks_view.html'
})
export class BookmarksView implements OnInit {

    public values:Array<Bookmark>;
    public filteredValues:Array<Bookmark>;
    public availableTags:Array<Array<Tag>>;
    private selectedValue:string;
    private selectedTag:Tag;

    constructor(private localBookmarkResolver:LocalBookmarkResolver, private googleBookmarkResolver:GoogleBookmarkResolver, private sanitizer:DomSanitizer) {

    }

    ngOnInit() {
        this.values = [];
        this.filteredValues = [];
        this.availableTags = [];
        this.localBookmarkResolver.findAll()
            .then(bookmarks => this.values = bookmarks)
            .then(bookmarks => this.filteredValues = bookmarks)
            .then(bookmarks => {
                let data:Tag[] = [];
                for(let value of bookmarks) {
                    data = _.union(data,value.tags);
                }
                for (let i=0; i<data.length; i+=6) {
                   this.availableTags.push(data.slice(i,i+6));
                }
        });
    }

    onUpload(event:any, tag:Tag) {
        let filesize:number = ((event.currentTarget.files[0].size/1024)/1024);
        let fileName:string = event.currentTarget.files[0].name;

        if(filesize>0.2 || (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg") && !fileName.endsWith(".gif"))) {
            return;
        }

        let urlCleaner:DomSanitizer=this.sanitizer;
        let fileReader:FileReader = new FileReader();
        fileReader.readAsDataURL(event.currentTarget.files[0]);
        fileReader.onloadend = function(e:any){
            tag.image = urlCleaner.bypassSecurityTrustStyle('url(' + e.target.result + ')');
        }
    }

    onChange(event:any) {
        this.selectedValue = event.target.value;

        if (this.selectedValue.trim().length == 0) {
            this.filteredValues = [];
            for(let value of this.values){
                if(_.contains(value.tags, this.selectedTag)){
                    this.filteredValues.push(value);
                }
            }
        } else {
            let result:Array<Bookmark> = [];
            for(let value of this.filteredValues){
               if(value.title.toLowerCase().indexOf(this.selectedValue.toLowerCase())>-1){
                   result.push(value);
               } else if(value.url.toLowerCase().indexOf(this.selectedValue.toLowerCase())>-1){
                   result.push(value);
               }
            }
            this.filteredValues = result;
        }
    }

    onTagClick(event:any, tag:Tag) {
        let result:Array<Bookmark> = [];
        for(let value of this.values){
            if(_.contains(value.tags, tag)){
                result.push(value);
            }
        }
        if(_.isEqual(result, this.filteredValues)){
            this.filteredValues = this.values;
            this.selectedTag = null;
        }else{
            this.selectedTag = tag;
            this.filteredValues = result;
        }
    }

    openSettings(event:any) {
        chrome.tabs.create({'url': "/settings.html"});
    }

    refreshView(event:any) {
        this.googleBookmarkResolver.refresh();

        if (this.selectedValue != undefined && this.selectedValue.trim().length == 0) {
            this.filteredValues = this.values;
        } else {
            this.localBookmarkResolver.find(this.selectedValue).then(bookmarks => this.filteredValues = bookmarks);
        }
    }

    cleanURL(url:string):SafeUrl{
        return this.sanitizer.bypassSecurityTrustUrl('chrome://favicon/' + url);
    }
}
