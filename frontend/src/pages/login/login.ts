import { Component }      from '@angular/core';
import { LoginForm, AuthService }      from '../../shared/';
import { NavController }  from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  loginData = new LoginForm('', '');
  constructor(public navCtrl: NavController, public authService: AuthService) {
    
  }
  login() {
    this.authService.login(this.loginData);
  }
}
