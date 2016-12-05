/**
 * Created by elie on 04.07.2016.
 */
import {SafeUrl} from '@angular/platform-browser';
export class Bookmark {
    constructor(public url:string,
                public favIco:SafeUrl,
                public title:string,
                public tags:string[],
                public src:BookmarkType,
                public color:string) {
    }
}

export enum BookmarkType {
    LOCAL = 1,
    OWN_CLOUD,
    GOOGLE_DRIVE
}

export interface BookmarksResolver {
    findAll():Promise<Array<Bookmark>>;
    find(criteria:string):Promise<Array<Bookmark>>;
    refresh():void;
}
