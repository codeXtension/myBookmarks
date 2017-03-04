/**
 * Created by elie on 03.03.2017.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './settings.module';
const platform = platformBrowserDynamic();
//noinspection TypeScriptValidateTypes
platform.bootstrapModule(AppModule);