/**
 * Created by elie on 09.12.2016.
 */

import { Component, OnInit,Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LocalBookmarkResolver} from "./local/local-bookmark-resolver";
import {Bookmark} from "./bookmark";
import SuggestResult = chrome.omnibox.SuggestResult;
import {Tag} from "./Tag";

@Component({
    selector: 'background',
    providers: [LocalBookmarkResolver],
    template: ''
})
export class BackgroundService implements OnInit {

    constructor(private localBookmarkResolver:LocalBookmarkResolver) {

    }

    ngOnInit() {
        let bookmarksFinder:LocalBookmarkResolver = this.localBookmarkResolver;
        let isTag:any = this.isTag;
        let isValidInput:any = this.isValidInput;

        chrome.omnibox.onInputStarted.addListener(function () {
            chrome.omnibox.setDefaultSuggestion({
                description: 'Searching for %s'
            });
        });

        chrome.omnibox.onInputChanged.addListener(
            function (text, suggest:any) { // SuggestResult[]
                if (text.length < 1) return;
                let query:string[] = text.split(' ');

                let filteredValues:Array<Bookmark> = [];
                console.info('Text for search ' + text);
                bookmarksFinder.findAll().then(moreBookmarks => {
                    filteredValues = filteredValues.concat(moreBookmarks);
                    let results:SuggestResult[] = [];
                    for (let fv of filteredValues) {
                        if (isValidInput(query, fv)) {
                            let res:SuggestResult = {content: null, description: null};
                            res.description = _.escape(fv.title);
                            res.content = fv.url;
                            results.push(res);
                        }
                    }
                    if (results.length > 4) {
                        let res:SuggestResult = {content: null, description: null};
                        res.description = 'Too many results found (' + results.length + '), displaying the first 4 ...';
                        res.content = 'chrome://newtab';
                        results = results.slice(0, 4);
                        results.push(res);
                    }
                    suggest(results);
                });
            });

        chrome.omnibox.onInputEntered.addListener(
            function (text:string) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    if (text.indexOf('http') > -1) {
                        chrome.tabs.update(tabs[0].id, {url: text});
                    } else {
                        chrome.tabs.update(tabs[0].id, {url: 'chrome://newtab#q=' + text});
                    }
                });
            });

        chrome.omnibox.onInputCancelled.addListener(function () {

        });
    }

    private isValidInput(query:string[], fv:Bookmark):boolean {
        let c:number = query.length;
        let title_match:string[] = BackgroundService.prototype.isArrayInString(query, fv.title);
        let url_match:string[] = BackgroundService.prototype.isArrayInString(query, fv.url);
        let tag_match:string[] = BackgroundService.prototype.isTag(query, fv.tags);

        if (title_match.length == c || url_match.length == c || tag_match.length == c) {
            return true;
        } else if (title_match.length > 0 || url_match.length > 0) {
            if (tag_match.length > 0 && (tag_match.length + title_match.length == c) && _.intersection(tag_match, title_match).length == 0) {
                return true;
            } else if (tag_match.length > 0 && (tag_match.length + url_match.length == c) && _.intersection(tag_match, url_match).length == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private isTag(text:string[], tags:Tag[]):string[] {
        let result:string[] = [];
        for (let tag of tags) {
            if (text.indexOf(tag.name.toLowerCase()) > -1) {
                result.push(tag.name.toLowerCase());
            }
        }
        return result;
    }

    private isArrayInString(arr:string[], txt:string):string[] {
        let result:string[] = [];
        for (let s of arr) {
            if (txt.toLowerCase().indexOf(s.toLowerCase()) > -1) {
                result.push(s.toLowerCase());
            }
        }
        return result;
    }
}