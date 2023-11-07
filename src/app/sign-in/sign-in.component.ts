import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.signInForm.valid) {
      const email = this.signInForm.value.email;
      const password = this.signInForm.value.password;

      this.authService.signIn(email, password).subscribe(() => {
        console.log("we signed in y'all")
        this.router.navigate(['/admin', 'add-products'])
      })
    }
  }
}
