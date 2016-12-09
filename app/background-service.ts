/**
 * Created by elie on 09.12.2016.
 */

import { Component, OnInit,Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LocalBookmarkResolver} from "./local/local-bookmark-resolver";
import {Bookmark} from "./bookmark";
import SuggestResult = chrome.omnibox.SuggestResult;

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

        chrome.omnibox.onInputStarted.addListener(function () {
            chrome.omnibox.setDefaultSuggestion({
                description: 'Searching for %s'
            });
        });

        chrome.omnibox.onInputChanged.addListener(
            function (text, suggest:any) { // SuggestResult[]
                if(text.length<3) return;

                let filteredValues:Array<Bookmark> = [];
                console.info('Text for search ' + text);
                bookmarksFinder.find(text).then(bookmarks => {
                    filteredValues = bookmarks;
                    let results:SuggestResult[] = [];
                    for (let fv of filteredValues) {
                        let res:SuggestResult = {content: null, description: null};
                        res.description = fv.title;
                        res.content = fv.url;
                        results.push(res);
                    }
                    suggest(results);
                });
            });

        chrome.omnibox.onInputEntered.addListener(
            function (text:string) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    if(text.indexOf('http')>-1){
                    chrome.tabs.update(tabs[0].id, {url: text});
                        }else{
                       chrome.tabs.update(tabs[0].id, {url: 'https://www.google.com/?gws_rd=ssl#q=' + text});
                    }
                });
            });

        chrome.omnibox.onInputCancelled.addListener(function () {

        });
    }

}