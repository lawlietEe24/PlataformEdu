import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
// import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path: 'main',
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/register']))
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'course-list', component: CourseListComponent },
  { path: 'add-course', component: AddCourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }