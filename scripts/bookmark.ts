/**
 * Created by elie on 04.07.2016.
 */
export class Bookmark {
    constructor(public url:string,
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
    findAll():Array<Bookmark>;
    find(criteria:string):Bookmark;
}