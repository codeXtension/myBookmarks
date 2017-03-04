/**
 * Created by elie on 04.03.2017.
 */
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'settings',
    templateUrl: '../views/settings_view.html'
})
export class SettingsView extends OnInit {
    private googleDrivePath:string = '';

    ngOnInit() {
        this.getGoogleDrivePath().then(value=> {
            this.googleDrivePath = value;
        });
    }

    onChange(event:any) {
        this.googleDrivePath = event.currentTarget.value;
        chrome.storage.local.set({'googleDrivePath': event.currentTarget.value}, () => {
            console.info('Google Drive path set to' + this.googleDrivePath);
        });
    }

    clearAllImages() {
        chrome.storage.sync.clear(()=> {
            Growl.settings.style = "notice";
            Growl.settings.size = "large";
            Growl.growl({title: "Settings", message: "All image references removed with success!"});
        });
    }

    private getGoogleDrivePath():Promise<string> {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get('googleDrivePath', output => {
                resolve(output.googleDrivePath);
            });
        });
    }
}