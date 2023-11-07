import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const AUTH_API_KEY = "AIzaSyA9iN0Y6O9zz8hRxBBnfqqg5R3mSGe563M";
const SIGN_UP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const REFRESH_URL =
  "https://securetoken.googleapis.com/v1/token?key=";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt: JwtHelperService = new JwtHelperService()

  constructor(private http: HttpClient) {
    this.makeValidToken()
  }

  signIn(email: string, password: string) {
    return this.http.post(SIGN_IN_URL + AUTH_API_KEY, {
      email,
      password,
      returnSecureToken: true
    }).pipe(tap((result: any) => {
      console.log('its working, I promise')
      localStorage.setItem('store-token', result.idToken)
      localStorage.setItem('store-email', result.email)
      localStorage.setItem('store-refresh-token', result.refreshToken)
    }));
  }

  isLoggedIn() {
    const token = localStorage.getItem('store-token')
    console.log('the token', token)
    console.log('is expired', this.jwt.isTokenExpired(token))
    return !this.jwt.isTokenExpired(token)
  }

  getToken() {
    return localStorage.getItem('store-token')
  }

  makeValidToken() {
    const token = localStorage.getItem('store-token')

      if(this.jwt.isTokenExpired(token)) {
        console.log('invalid, refreshing now')
        // this.refreshToken().subscribe()
      } else {
        console.log('token looks good, move on')
      }
  }

  private refreshToken() {
    return this.http.post(REFRESH_URL + AUTH_API_KEY, {
      refreshToken: localStorage.getItem('store-refresh-token'),
      grantType: 'refresh_token'
    }).pipe(tap((result: any) => {
      localStorage.setItem('store-token', result.id_token)
      localStorage.setItem('store-refresh-token', result.refresh_token)
    }));
  }
}
