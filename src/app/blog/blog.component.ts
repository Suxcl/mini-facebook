import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, UsersComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
