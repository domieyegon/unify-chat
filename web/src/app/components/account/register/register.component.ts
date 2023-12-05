import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    msisdn: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private accountService:AccountService,
    private router:Router,
    ) {}


  register(){
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid){
      return;
    }

    this.accountService.register(this.registerForm.value).subscribe({
      next: (res)=>{
        this.login();
      },
      error: (err)=>{
        console.error(err);
      }
    });
  }

  login(){

    let userInfo = {
      username: this.email?.value,
      password: this.password?.value
    }

    this.accountService.login(userInfo).subscribe({
      next: (res)=>{
        sessionStorage.setItem('X-Auth-Token', res.body.token);
        sessionStorage.setItem('user', JSON.stringify(res.body.user));
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigateByUrl("/");
        console.log(res);
      },
      error: (err)=>{
        console.error(err);
      }
    });
  }

  get fullName(){
    return this.registerForm.get('fullName');
  }

  get msisdn(){
    return this.registerForm.get('msisdn');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }
}
