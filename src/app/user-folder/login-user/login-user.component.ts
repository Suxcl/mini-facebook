import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventEmitter } from 'stream';
import { emit } from 'process';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit{
  @Output() doLoginInParent = new EventEmitter< {login:string, password:string} >();
  form4login:FormGroup;

  constructor(
    private router: Router,
    private userService: UserService){
      console.log("edit constructor running")
      this.form4login = new FormGroup({
        username: new FormControl(),
        password: new FormControl()
      });
  }

  ngOnInit(): void{
    console.log('login user initialised');
  }

  doLoginUser(){
    console.log('login:', this.form4login);
    this.doLoginInParent.emit({
      login:this.form4login.value.username,
      password:this.form4login.value.password
    })
  }

}
