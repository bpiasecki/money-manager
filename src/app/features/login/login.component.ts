import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '@core/services/db.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hidePassword = true;
  showIncorrectCredentialsInfo: boolean = false;

  constructor(private authService: AuthService, private dbService: DbService, private router: Router) { }

  login() {
    this.dbService.setIsLoading(true);
    this.showIncorrectCredentialsInfo = false;
    this.authService.login(this.email.value, this.password.value).then(() => {
      this.dbService.init();
      this.router.navigate(['/accounts']);
    }).catch(() => {
      this.showIncorrectCredentialsInfo = true;
      this.dbService.setIsLoading(false);
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Adres e-mail nie może być pusty';
    }

    return this.email.hasError('email') ? 'Niepoprawny adres e-mail' : '';
  }

}
