import {  HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // headers.append("Authorization", "Bearer ");

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkb21pZXllZ29uNzBAZ21haWwuY29tIiwiaWF0IjoxNzAxMzIxMTIzLCJleHAiOjE3MDEzMjI5MjN9.jsTWHPfiSyfALW7KHqQdCKJviI-onqUAHBV7_7Q2HNc";

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log(request);
  return next(request).pipe(
    catchError((err)=> {
      return throwError(() => new Error(err.error));
    })
  );
};
