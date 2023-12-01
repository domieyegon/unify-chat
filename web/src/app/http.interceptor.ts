import {  HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const router= inject(Router);

  
  if (
    req.url.includes('login') ||
    req.url.includes('activate') ||
    req.url.includes('register')
  ) {
    return next(req);
  }


  const token = sessionStorage.getItem('X-Auth-Token');

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log(req);
  return next(req).pipe(
    catchError((err)=> {
      if ([401,403].includes(err.status)){
        sessionStorage.removeItem('X-Auth-Token');
        router.navigateByUrl('/login');
      }
      return throwError(() => new Error(err.error));
    })
  );
};
