import { Routes } from '@angular/router';
import { ReactiveComponent } from './component/reactive/reactive.component';
import { TableComponent } from './component/table/table.component';
import { RegisteruserComponent } from './component/registeruser/registeruser.component';
import { LoginuserComponent } from './component/loginuser/loginuser.component';

export const routes: Routes = [
    {path:'', component:ReactiveComponent},
    {path:'showdata', component:TableComponent},
    {path:'register', component:RegisteruserComponent},
    {path:'login', component:LoginuserComponent},
    { path: '**', redirectTo: '' }
];
