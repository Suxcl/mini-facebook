import { Routes } from '@angular/router';
import { UsersComponent } from './components/user-folder/users/users.component';
import { EditUserComponent } from './components/user-folder/edit-user/edit-user.component';
import { LoginUserComponent } from './components/user-folder/login-user/login-user.component';
import { RegisterUserComponent } from './components/user-folder/register-user/register-user.component';

import { BlogComponent } from './components/blog/blog.component';
import { UserComponent } from './components/user-folder/user/user.component';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { AuthenticationService } from './services/authentication.service';


export const routes: Routes = [
    { path: 'service', component: UserService},
    { path: 'service', component: PostService},
    { path: 'service', component: AuthenticationService},
    // { path: 'profile', component: UserComponent},
    { path: 'show-user/:id', component: UserComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
    { path: 'login', component: LoginUserComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: 'home', component: BlogComponent},
    { path: '', redirectTo: '/home', pathMatch:'full'},
    // { path: '**', redirectTo: '/home'}
];

