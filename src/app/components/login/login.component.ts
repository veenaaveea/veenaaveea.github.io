import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AuthenticationError} from "../../shared/http/response/auth";
import User = Realm.User;
import {ActivatedRoute, Router} from "@angular/router";
import {NavBarCustomisationService} from "../../services/nav-bar-customisation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  authenticationError?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private navBarService: NavBarCustomisationService
  ) {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required
          ]
        ]
      }
    );
  }

  get email(): AbstractControl | null {
    return this.form!.get('email');
  }

  get password(): AbstractControl | null {
    return this.form!.get('password');
  }

  authenticate() {
    if (this.form!.invalid) {
      this.form!.markAllAsTouched();
      return;
    }

    const email = this.form!.value['email'];
    const password = this.form!.value['password'];

    this.authService.login(email, password)
      .then((user: User) => {
        this.route.queryParamMap.subscribe(params => {
          const redirect = decodeURI(params.get('redirect') ?? '');
          this.router.navigateByUrl(redirect);
        })
      })
      .catch((err: AuthenticationError) => {
        this.authenticationError = err.error;
        return err;
      })
  }

  ngOnInit(): void {
    this.navBarService.fixedTop = false;
  }
}
