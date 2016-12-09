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
            description: 'elie is the best'
          });
        });

        chrome.omnibox.onInputChanged.addListener(
          function(text, suggest) {

          });

        chrome.omnibox.onInputEntered.addListener(
            function(text:string) {

          });

        chrome.omnibox.onInputCancelled.addListener(function() {

        });
    }

}