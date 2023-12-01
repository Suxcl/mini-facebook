import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user.model';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  @Input() user4edit!:User;
  @Input() selectedUser!:number;
  @Output() doEditInParent = new EventEmitter< {user:User, which:number} >();

  form4edit:FormGroup;

  constructor(
    private router: Router,
    private userService: UserService){
      this.form4edit = new FormGroup({
        username: new FormControl(),
        name: new FormControl(),
        surname: new FormControl(),
        Email: new FormControl(),
        PhoneNumber: new FormControl(),

      });
  }

  ngOnInit(): void {
      console.log('edit user launched', this.user4edit.surname);
      this.form4edit.setValue({
        username: this.user4edit,   
        name: this.user4edit,
        surname: this.user4edit.surname,
        Email: this.user4edit.Email,
        PhoneNumber: this.user4edit.PhoneNumber
      });
  }
  doEditUser(){
    console.log('form', this.form4edit);
    let userAfterEdit = new User(
      this.form4edit.value.username,
      this.form4edit.value.name,
      this.form4edit.value.surname,
      this.form4edit.value.password,
      this.form4edit.value.email,
      this.form4edit.value.phoneNumber,
      );
      this.doEditInParent.emit({user:userAfterEdit,which:this.selectedUser});
  }

}
