import { Routes } from '@angular/router';
import { UsersComponent } from './user-folder/users/users.component';
import { AddUserComponent } from './user-folder/add-user/add-user.component';
import { EditUserComponent } from './user-folder/edit-user/edit-user.component';
import { LoginUserComponent } from './user-folder/login-user/login-user.component';
import { RegisterUserComponent } from './user-folder/register-user/register-user.component';

import { BlogComponent } from './blog/blog.component';
import { UserComponent } from './user-folder/user/user.component';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { AuthenticationService } from './services/authentication.service';

export const routes: Routes = [
    { path: 'service', component: UserService},
    { path: 'service', component: PostService},
    { path: 'service', component: AuthenticationService},
    { path: 'show-user/:id', component: UserComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
    { path: 'login', component: LoginUserComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: '', component: BlogComponent}
    // { path: '**', component: Component},
];

