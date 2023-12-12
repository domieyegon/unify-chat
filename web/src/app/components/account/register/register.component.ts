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

  errorMessage = '';
  isRegisteredSuccessfully=false;

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
    this.errorMessage = '';
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid){
      return;
    }

    this.accountService.register(this.registerForm.value).subscribe({
      next: (res)=>{
        this.isRegisteredSuccessfully=true;
      },
      error: (err)=>{
        this.isRegisteredSuccessfully=false;
        this.errorMessage = err?.error?.message || "Something went wrong while trying to register!"

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
