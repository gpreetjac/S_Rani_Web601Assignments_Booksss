import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    loadChildren: () => import('./content-list/content-list.module').then(m => m.ContentListModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./content-list/content-list.module').then(m => m.ContentListModule)
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./content-detail/content-detail.module').then(m => m.ContentDetailModule)
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
