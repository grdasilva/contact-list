import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  
  constructor(public router : Router, public toast: ToastService) { }

  ngOnInit() {}

  onLogin(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        this.router.navigateByUrl('home');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;              
        this.toast.present(errorMessage);  
      });

}

}
