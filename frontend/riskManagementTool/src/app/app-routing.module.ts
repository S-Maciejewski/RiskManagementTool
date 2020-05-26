import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import { ProjectDetailsComponent } from "./pages/project-details/project-details.component";
import { ProjectEditComponent } from "./pages/project-edit/project-edit.component";
import { RegisterDetailsComponent } from "./pages/register-details/register-details.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/create', component: CreateProjectComponent },
  { path: 'projects/details/:projectId', component: ProjectDetailsComponent },
  { path: 'projects/edit/:projectId', component: ProjectEditComponent },
  { path: 'registers/:registerId', component: RegisterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
