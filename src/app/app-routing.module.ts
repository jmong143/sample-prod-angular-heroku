import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Frontend Components
import { HomeComponent } from './components/frontend/home/home.component';
import { LoginComponent } from './components/frontend/login/login.component';
import { RegistrationComponent } from './components/frontend/registration/registration.component';
import { ResetPasswordComponent } from './components/frontend/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/frontend/update-password/update-password.component';
import { AboutComponent } from './components/frontend/pages/about/about.component';
import { SubjectsComponent } from './components/frontend/subjects/subjects.component';
import { SubjectInfoComponent } from './components/frontend/subject-info/subject-info.component';
import { LessonComponent } from './components/frontend/lesson/lesson.component';

//Admin Dashboard Routes
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { OverviewComponent } from './components/admin/overview/overview.component';
import { ExamComponent } from './components/admin/exam/exam.component';
import { AdminLoginComponent } from './components/admin/login/login.component';
import { SubjectComponent } from './components/admin/subject/subject.component';
import { AdminNewsComponent } from './components/admin/news/news.component';
import { AdminNewsViewComponent } from './components/admin/news/view/view.component'

//Admin service
import { AuthGuard } from '../app/services/admin/guards/auth.guard';
import { UserService } from './services/frontend/user/user.service';
import { AdminUserResolverService } from './services/admin/resolver/user-resolver.service';
import { AdminSubjectResolverService } from './services/admin/resolver/subject-resolver.service';
import { AdminNewsResolverService } from './services/admin/resolver/news-resolver.service';

import { HomeResolve } from './resolve/frontend/home-resolve.service';
import { SubjectResolve } from './resolve/frontend/subject-resolve.service';
import { SubjectInfoResolve } from './resolve/frontend/subject-info-resolve.service';
import { TopicResolve } from './resolve/frontend/topic-resolve.service';

let dashboardBasePath = 'admin-control';
const routes: Routes = [
  //Frontend Routes
  {path: '', component: HomeComponent, resolve: { homeResolve: HomeResolve }},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'update-password', component: UpdatePasswordComponent},
  {path: 'subjects', component: SubjectsComponent, resolve: { subjectResolve: SubjectResolve }},
  {path: 'subject/:name', component: SubjectInfoComponent, resolve: { subjectInfoResolve: SubjectInfoResolve }, data: { path: 'subject/:name?id=:id' }},
  {path: 'lesson/:name', component: LessonComponent, resolve: { subjectInfoResolve: SubjectInfoResolve }},


  //Admin Dashboard Routes
  {
    path: `${dashboardBasePath}`,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OverviewComponent,
        resolve: { 
          userOverview : AdminUserResolverService, 
          subjectOverview : AdminSubjectResolverService 
        },
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'dashboard',
        component: OverviewComponent,
        resolve: { 
          userOverview : AdminUserResolverService, 
          subjectOverview : AdminSubjectResolverService 
        },
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'news',
        component: AdminNewsComponent,
        resolve : { newsList : AdminNewsResolverService },
        data: {
          title: 'News Management'
        }
      },
      {
        path: 'news/:id',
        component: AdminNewsViewComponent,
        data: {
          title: 'News Management'
        }
      },
      {
        path: 'user',
        component: UsersComponent,
        resolve: { usersList : AdminUserResolverService },
        data: {
          title: 'User Management'
        }
      },
      {
        path: 'exam',
        component: ExamComponent,
        data: {
          title: 'Exam Management'
        }
      },
      {
        path: 'subject',
        component: SubjectComponent,
        resolve: { subjectList : AdminSubjectResolverService },
        data: {
          title: 'Subject Management'
        }
      }
    ]
  },
  {
    path : 'admin-login',
    component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
