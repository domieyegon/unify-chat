import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(
    private accountService:AccountService,
    private router:Router,
    ) {}
  ngOnInit(): void {
    this.getCurrentLocation();
  }

  login(){

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
      }
    });
  }



  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                  position.coords.latitude +
                  'Longitude: ' +
                  position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
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
