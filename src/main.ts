import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import * as dotenv from 'dotenv';

export class AppModule { }

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));