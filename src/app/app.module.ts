import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MomentPipe } from './plugin/momentPipe';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/frontend/pages/about/about.component';
import { HomeComponent } from './components/frontend/home/home.component';
import { HeaderComponent } from './components/frontend/layout/header/header.component';
import { FooterComponent } from './components/frontend/layout/footer/footer.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminSideNavComponent } from './components/admin/layout/admin-side-nav/admin-side-nav.component';
import { AdminHeaderComponent } from './components/admin/layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './components/admin/layout/admin-footer/admin-footer.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ExamComponent } from './components/admin/exam/exam.component';
import { OverviewComponent } from './components/admin/overview/overview.component';
import { UpdateProfileComponent } from './components/admin/layout/update-profile/update-profile.component';
import { SideNavComponent } from './components/frontend/layout/side-nav/side-nav.component';
import { MainContentComponent } from './components/frontend/main-content/main-content.component';
import { HomeSubjectOverviewComponent } from './components/frontend/main-content/home-subject-overview/home-subject-overview.component';
import { HomeRecentActivitiesComponent } from './components/frontend/main-content/home-recent-activities/home-recent-activities.component';
import { HomeNewsComponent } from './components/frontend/main-content/home-news/home-news.component';
import { AdminLoginComponent } from './components/admin/login/login.component';
import { LoginComponent } from './components/frontend/login/login.component';
import { NonNavBarComponent } from './components/frontend/layout/non-nav-bar/non-nav-bar.component';
import { RegistrationComponent } from './components/frontend/registration/registration.component';
import { SubjectComponent } from './components/admin/subject/subject.component';
import { PageLoaderComponent } from './components/frontend/layout/page-loader/page-loader.component';
import { AdminUserModalComponent } from './components/admin/users/modal/modal.component';
import { AdminUserResolverService } from './services/admin/resolver/user-resolver.service';
import { AdminSubjectResolverService } from './services/admin/resolver/subject-resolver.service';
import { ResetPasswordComponent } from './components/frontend/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/frontend/update-password/update-password.component';
import { AdminSubjectModalComponent } from './components/admin/subject/modal/modal.component';
import { AdminNewsComponent } from './components/admin/news/news.component';
import { AdminNewsResolverService } from './services/admin/resolver/news-resolver.service';
import { AdminNewsViewComponent } from './components/admin/news/view/view.component';
import { AdminDailyTipModalComponent } from './components/admin/news/modal/modal.component';
import { AdminSubjectCodesComponent } from './components/admin/subject-codes/subject-codes.component';

import { TokenInterceptor } from './services/admin/helper/token.interceptor';

import { HomeResolve } from './resolve/frontend/home-resolve.service';
import { SubjectResolve } from './resolve/frontend/subject-resolve.service';
import { SubjectInfoResolve } from './resolve/frontend/subject-info-resolve.service';
import { SubjectsComponent } from './components/frontend/subjects/subjects.component';
import { SubjectInfoComponent } from './components/frontend/subject-info/subject-info.component';
import { LessonComponent } from './components/frontend/lesson/lesson.component';
import { ReadLessonComponent } from './components/frontend/read-lesson/read-lesson.component';


import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AdminSideNavComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    UsersComponent,
    ExamComponent,
    OverviewComponent,
    UpdateProfileComponent,
    SideNavComponent,
    MainContentComponent,
    HomeSubjectOverviewComponent,
    HomeRecentActivitiesComponent,
    HomeNewsComponent,
    AdminLoginComponent,
    LoginComponent,
    NonNavBarComponent,
    RegistrationComponent,
    SubjectComponent,
    PageLoaderComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    AdminUserModalComponent,
    AdminSubjectModalComponent,
    AdminNewsComponent,
    AdminNewsViewComponent,
    AdminDailyTipModalComponent,
    SubjectsComponent,
    MomentPipe,
    SubjectInfoComponent,
    AdminSubjectCodesComponent,
    LessonComponent,
    ReadLessonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule
  ],
  providers: [
    AdminUserResolverService, AdminSubjectResolverService, AdminNewsResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HomeResolve,
    SubjectResolve,
    SubjectInfoResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
