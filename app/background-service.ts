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

        chrome.omnibox.onInputStarted.addListener(function () {
            chrome.omnibox.setDefaultSuggestion({
                description: 'Searching for %s'
            });
        });

        chrome.omnibox.onInputChanged.addListener(
            function (text, suggest:any) { // SuggestResult[]
                if (text.length < 1) return;

                let filteredValues:Array<Bookmark> = [];
                console.info('Text for search ' + text);
                bookmarksFinder.findAll().then(moreBookmarks => {
                    filteredValues = filteredValues.concat(moreBookmarks);
                    let results:SuggestResult[] = [];
                    for (let fv of filteredValues) {
                        if (fv.title.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                            fv.url.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                            isTag(fv.tags, text)) {
                            let res:SuggestResult = {content: null, description: null};
                            res.description = _.escape(fv.title);
                            res.content = fv.url;
                            results.push(res);
                        }
                    }
                    if (results.length > 5) {
                        let res:SuggestResult = {content: null, description: null};
                        res.description = 'Too many results found (' + results.length + '), please refine more your search ...';
                        res.content = 'chrome://newtab';
                        results = [];
                        results.push(res);
                    }
                    suggest(results);
                    console.info("Found " + results.length + " results.");
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

    private isTag(tags:Tag[], text:string):boolean {
        for (let tag of tags) {
            if (tag.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    }

}