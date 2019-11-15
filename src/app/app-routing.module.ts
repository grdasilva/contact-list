import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]},
  { path: 'login', loadChildren: () => import('./components/login/login.module').then( m => m.LoginComponentModule)},
  { path: 'register', loadChildren: () => import('./components/register/register.module').then( m => m.RegisterComponentModule)},
  { path: 'details', loadChildren: () => import('./components/details/details.module').then( m => m.DetailsComponentModule), canActivate: [AuthGuard]},
  { path: 'details/:id', loadChildren: () => import('./components/details/details.module').then( m => m.DetailsComponentModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
