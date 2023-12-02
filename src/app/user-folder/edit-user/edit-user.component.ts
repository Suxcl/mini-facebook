import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  @Input() user4edit!:User;
  @Input() selectedUser:number=-1;
  @Output() doEditInParent = new EventEmitter< {user:User, which:number} >();

  form4edit:FormGroup;

  constructor(
    private router: Router,
    private userService: UserService){
      console.log("edit constructor running")
      this.form4edit = new FormGroup({
        username: new FormControl(),
        name: new FormControl(),
        surname: new FormControl(),
        email: new FormControl(),
        phoneNumber: new FormControl(),

      });
  }

  ngOnInit(): void {
      console.log('edit user launched', this.user4edit.Surname);
      console.log(this.user4edit.Surname);
      console.log(this.user4edit.Email);
      this.form4edit.setValue({
        username: this.user4edit.Username,   
        name: this.user4edit.Name,
        surname: this.user4edit.Surname,
        email: this.user4edit.Email,
        phoneNumber: this.user4edit.PhoneNumber
      });
      console.log("Test nigger: " + this.form4edit.valid);
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
