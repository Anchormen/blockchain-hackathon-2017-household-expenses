import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';

import { AuthService } from "../shared/services/auth.service";
import { ApiService } from "../shared/services/api.service";
import { AuthGuardService } from '../shared/services/auth.guard.service';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({    
    noJwtError: true,    
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

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
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler 
    },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    ApiService,
    AuthService,
    AuthGuardService,
    Storage
  ]
})
export class AppModule { }
