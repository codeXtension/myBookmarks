/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import { bootstrap }    from 'angular2/platform/browser';
import { BookmarksView } from './bookmarks-view';
import { GoogleSettings } from './gd/google-settings';
import { OcSettings } from './oc/oc-settings';

bootstrap(BookmarksView);
bootstrap(GoogleSettings);
bootstrap(OcSettings);