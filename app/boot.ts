/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import { bootstrap }    from 'angular2/platform/browser';
import { BookmarksView } from './bookmarks-view';
import { GoogleSettings } from './gd/google-settings';
import { OcSettings } from './oc/oc-settings';
import { LocalSettings } from './local/local-settings';
import {enableProdMode} from 'angular2/core';
enableProdMode();

bootstrap(BookmarksView);
bootstrap(GoogleSettings);
bootstrap(OcSettings);
bootstrap(LocalSettings);