import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventEmitter } from 'stream';
import { emit } from 'process';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
  providers:[UserService]
})
export class LoginUserComponent implements OnInit{
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
    const temp = this.userService.getUser(this.form4login.value.username);
    if (this.form4login.value.username == temp.Username && this.form4login.value.password == temp.Password) {
      console.log('login Succ eded');
    }else{
      console.log('Login faileds');
    }
  }

}
