import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RepoComponent } from './repo/repo.component';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'repo/:user/:name',
    component: RepoComponent
  },
  {
    path: 'repo/:user/:name/issues',
    component: IssuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
