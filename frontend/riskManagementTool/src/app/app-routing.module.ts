import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
import { ProjectDetailsComponent } from "./pages/project-details/project-details.component";
import { ProjectEditComponent } from "./pages/project-edit/project-edit.component";
import { RegisterDetailsComponent } from "./pages/register-details/register-details.component";
import { RegisterEditComponent } from './pages/register-edit/register-edit.component';
import { CreateRegisterComponent } from './pages/create-register/create-register.component';
import { RiskEditComponent } from './pages/risk-edit/risk-edit.component';
import { RiskCreateComponent } from './pages/risk-create/risk-create.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/create', component: CreateProjectComponent },
      { path: 'projects/details/:id', component: ProjectDetailsComponent },
      { path: 'projects/edit/:id', component: ProjectEditComponent },
      { path: 'registers/create/:projectId', component: CreateRegisterComponent },
      { path: 'registers/details/:id', component: RegisterDetailsComponent },
      { path: 'registers/edit/:id', component: RegisterEditComponent },
      { path: 'risks/create/:registerId', component: RiskCreateComponent },
      { path: 'risks/edit/:id', component: RiskEditComponent }
  ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
