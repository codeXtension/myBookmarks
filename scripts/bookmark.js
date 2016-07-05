System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Bookmark, BookmarkType;
    return {
        setters: [],
        execute: function () {
            /**
             * Created by elie on 04.07.2016.
             */
            Bookmark = (function () {
                function Bookmark(url, title, tags, src, color) {
                    this.url = url;
                    this.title = title;
                    this.tags = tags;
                    this.src = src;
                    this.color = color;
                }

                return Bookmark;
            }());
            exports_1("Bookmark", Bookmark);
            (function (BookmarkType) {
                BookmarkType[BookmarkType["LOCAL"] = 1] = "LOCAL";
                BookmarkType[BookmarkType["OWN_CLOUD"] = 2] = "OWN_CLOUD";
                BookmarkType[BookmarkType["GOOGLE_DRIVE"] = 3] = "GOOGLE_DRIVE";
            })(BookmarkType || (BookmarkType = {}));
            exports_1("BookmarkType", BookmarkType);
        }
    }
});
//# sourceMappingURL=bookmark.js.map