import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { DbService } from '@core/db/db.service';

@Component({
  selector: 'mm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hidePassword = true;
  incorrectCredentialsInfo: string | null;

  constructor(private authService: AuthService, private dbService: DbService, private router: Router) { }

  register() {
    this.dbService.setIsLoading(true);
    this.incorrectCredentialsInfo = null;

    this.authService.register(this.email.value, this.password.value).then((user) => {
      this.dbService.setInitialUserData(this.name.value, user.user?.uid).then(() => {
        this.router.navigate(['/login']);
        this.dbService.setIsLoading(false);
      });
    }).catch((error) => {
      console.error(error);
      this.incorrectCredentialsInfo = "Błąd podczas rejestracji nowego użytkownika";
      this.dbService.setIsLoading(false);
    })
  }

}
