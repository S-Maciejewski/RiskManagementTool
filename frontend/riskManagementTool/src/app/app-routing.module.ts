import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import { ProjectDetailsComponent } from "./pages/project-details/project-details.component";
import { ProjectEditComponent } from "./pages/project-edit/project-edit.component";
import { RegisterDetailsComponent } from "./pages/register-details/register-details.component";
import { RegisterEditComponent } from './pages/register-edit/register-edit.component';
import { CreateRegisterComponent } from './pages/create-register/create-register.component';
import { RiskDetailsComponent } from './pages/risk-details/risk-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/create', component: CreateProjectComponent },
  { path: 'projects/details/:id', component: ProjectDetailsComponent },
  { path: 'projects/edit/:id', component: ProjectEditComponent },
  { path: 'registers/create', component: CreateRegisterComponent },
  { path: 'registers/details/:id', component: RegisterDetailsComponent },
  { path: 'registers/edit/:id', component: RegisterEditComponent },
  { path: 'risks/details/:id', component: RiskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
