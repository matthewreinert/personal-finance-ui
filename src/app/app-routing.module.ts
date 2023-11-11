import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: AccountDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
