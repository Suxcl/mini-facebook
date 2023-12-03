import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../user-folder/users/users.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, UsersComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  providers: [UserService]
})
export class BlogComponent implements OnInit{
  constructor(private userService:UserService){}
  ngOnInit(): void {
      
  }
}
