import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hidePassword = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email.value, this.password.value).then((result) => {
      console.log(result);
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Adres e-mail nie może być pusty';
    }

    return this.email.hasError('email') ? 'Niepoprawny adres e-mail' : '';
  }

}
