/**
 * Created by elie on 26.06.2016.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'click-me',
    template: `<button (click)="onClickMe()">Click me!</button>{{clickMessage}}`
})

export class ClickMeComponent{
    clickMessage = '';

    onClickMe() {
        this.clickMessage = 'You are my Hero!';
    }
}