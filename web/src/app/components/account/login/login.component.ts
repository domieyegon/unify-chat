import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../service/account.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorMessage='';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private accountService:AccountService,
    private router:Router,
    ) {}

  login(){

    this.errorMessage='';

    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid){
      return;
    }

    this.accountService.login(this.loginForm.value).subscribe({
      next: (res)=>{
        sessionStorage.setItem('X-Auth-Token', res.body.token);
        sessionStorage.setItem('user', JSON.stringify(res.body.user));
        sessionStorage.setItem('isLoggedIn', 'true');
        // this.accountService.isLoggedIn.next(true);
        this.router.navigateByUrl("/");
        console.log(res);
      },
      error: (err)=>{
        console.error(err);
        this.errorMessage = err?.error?.message || "Something went wrong while trying to login!"
      }
    });
  }


  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
