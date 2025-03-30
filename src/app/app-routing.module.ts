import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// Importación de componentes
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const redirectToLogin = () => redirectUnauthorizedTo(['/welcome']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  
  // Rutas públicas (sin navbar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  
  // Rutas privadas (con navbar)
  {
    path: '',
    component: MainLayoutComponent,
    ...canActivate(redirectToLogin),
    children: [
      { path: 'main', component: MainComponent },
      { path: 'add-course', component: AddCourseComponent },
      { path: 'edit-course/:id', component: EditCourseComponent }
    ]
  },
  
  // Ruta 404 - DEBE SER LA ÚLTIMA
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }