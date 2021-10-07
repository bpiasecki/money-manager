import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { DbService } from '@core/db/db.service';
import { CategoriesService } from '@shared/services/categories.service';
import { switchMap, tap } from 'rxjs/operators';

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

  constructor(private authService: AuthService, private dbService: DbService, private router: Router, private categoriesService: CategoriesService) { }


  register() {
    this.dbService.setIsLoading(true);
    this.incorrectCredentialsInfo = null;

    this.authService.register(this.email.value, this.password.value).pipe(
      tap(
        (userId) => {
          console.log(userId)
          this.router.navigate(['/login']);
          this.dbService.setIsLoading(false);
        },
        (error) => {
          console.error(error);
          this.incorrectCredentialsInfo = "Błąd podczas rejestracji nowego użytkownika";
          this.dbService.setIsLoading(false);
        }),
      switchMap((userId) =>
        this.categoriesService.setInitialCategories(userId))).subscribe(() => {
          this.router.navigate(['/login']);
          this.dbService.setIsLoading(false);
        });

  }

}
