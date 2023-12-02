import { Routes } from '@angular/router';
import { User } from './models/user.model';
import { UsersComponent } from './user-folder/users/users.component';
import { AddUserComponent } from './user-folder/add-user/add-user.component';
import { EditUserComponent } from './user-folder/edit-user/edit-user.component';


import { BlogComponent } from './blog/blog.component';
import { UserComponent } from './user-folder/user/user.component';

export const routes: Routes = [
    { path: 'show-user', component: UserComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
];
