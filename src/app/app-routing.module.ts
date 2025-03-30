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
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const redirectToLogin = () => redirectUnauthorizedTo(['/welcome']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  
  // Rutas con NavBar (Layout principal)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { 
        path: 'main', 
        component: MainComponent,
        ...canActivate(redirectToLogin)
      },
      { 
        path: 'add-course', 
        component: AddCourseComponent,
        ...canActivate(redirectToLogin)
      },
      { 
        path: 'edit-course/:id', 
        component: EditCourseComponent,
        ...canActivate(redirectToLogin)
      },
      {path: 'welcome', component:WelcomeComponent},
      {path: 'footer', component: FooterComponent},
      {path: '**', component:NotFoundComponent}
    ]
  },
  
  // Rutas sin NavBar (Layout de autenticación)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }