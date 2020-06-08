import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './pages/login/login.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './pages/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { RegisterDetailsComponent } from './pages/register-details/register-details.component';
import { RegisterEditComponent } from './pages/register-edit/register-edit.component';
import { CreateRegisterComponent } from './pages/create-register/create-register.component';
import { RiskDetailsComponent } from './pages/risk-details/risk-details.component';
import { RiskListEntryComponent } from './components/risk-list-entry/risk-list-entry.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainViewComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectDetailsComponent,
    ProjectEditComponent,
    RegisterDetailsComponent,
    RegisterEditComponent,
    CreateRegisterComponent,
    RiskDetailsComponent,
    RiskListEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
