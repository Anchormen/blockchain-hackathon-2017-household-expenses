import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from  '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';

import { AuthService } from "../shared/services/auth.service";
import { ApiService } from "../shared/services/api.service";
import { AuthGuardService } from '../shared/services/auth.guard.service';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthGuardService,
    ApiService
  ]
})
export class AppModule {}
