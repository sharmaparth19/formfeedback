import { Routes } from '@angular/router';
import { ReactiveComponent } from './component/reactive/reactive.component';
import { TableComponent } from './component/table/table.component';

export const routes: Routes = [
    {path:'', component:ReactiveComponent},
    {path:'showdata', component:TableComponent},
    { path: '**', redirectTo: '' }
];
