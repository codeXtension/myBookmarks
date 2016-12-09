/**
 * Created by elie on 09.12.2016.
 */

import { Component, OnInit,Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'background',
    template: ''
})
export class BackgroundService implements OnInit {

    ngOnInit() {
        chrome.omnibox.onInputStarted.addListener(function() {
          chrome.omnibox.setDefaultSuggestion({
            description: 'Search for %s'
          });
        });

        chrome.omnibox.onInputChanged.addListener(
          function(text, suggest) {
            console.info('Text for search' + text);
          });

        chrome.omnibox.onInputEntered.addListener(
            function(text:string) {
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.update(tabs[0].id, {url: text});
              });
          });

        chrome.omnibox.onInputCancelled.addListener(function() {

        });
    }

}