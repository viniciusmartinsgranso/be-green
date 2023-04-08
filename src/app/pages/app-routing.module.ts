import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'collect-points',
    loadChildren: () => import('./main/collect-points/collect-points.module').then( m => m.CollectPointsPageModule)
  },
  {
    path: 'learn',
    loadChildren: () => import('./main/learn/learn.module').then( m => m.LearnPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./main/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./main/company/company.module').then( m => m.CompanyPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
