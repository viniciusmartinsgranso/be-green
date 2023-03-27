import { Component, OnInit } from '@angular/core';
import { LoginPayload } from '../../models/payloads/login.payload';
import { CustomValidators } from '../../utils/validators';
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  public isLogin: boolean = false;

  public isRegister: boolean = false;

  public loginPayload: LoginPayload = {
    email: '',
    password: '',
  };

  ngOnInit() {
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

}
