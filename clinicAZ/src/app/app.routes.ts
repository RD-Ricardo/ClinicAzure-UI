import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuard } from './guards/auth.guard';
import { Component } from '@angular/core';
import { GroupsComponent } from './home/groups/groups.component';
import { SignInsComponent } from './home/my-sign-ins/sign-ins.component';
import { UsersComponent } from './home/users/users.component';
import { TenantComponent } from './home/tenant/tenant.component';
import { NoAuthGuard } from './guards/noAuth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    // { path: '**', redirectTo: '' },
    {
        path: '',
        component: NavigationComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'groups',
                component: GroupsComponent
            },
            {
                path: 'my-sign-ins',
                component: SignInsComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'tenant',
                component: TenantComponent
            }
        ]
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        children: [
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];
