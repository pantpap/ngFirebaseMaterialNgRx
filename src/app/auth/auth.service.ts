import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticaticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
   this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
    console.log(result);
    this.authSuccessfully();
   }).catch(error => {
     console.log(error)
   })
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      this.authSuccessfully();
    }).catch(error => {
      console.log(error);
    })

  }

  logout() {
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticaticated = false;
  }


  isAuth() {
    return this.isAuthenticaticated;
  }

  private authSuccessfully() {
    this.isAuthenticaticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
