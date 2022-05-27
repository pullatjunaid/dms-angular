import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ToastrModule } from 'ngx-toastr';
import { FooterModule } from './shared/footer/footer.module';
import { EntriesComponent } from './pages/entries/entries.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DestinationListComponent } from './pages/destination-list/destination-list.component';
import { AddDestinationComponent } from './components/add-destination/add-destination.component';
import { BackupDatabaseComponent } from './pages/backup-database/backup-database.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { AddAppUserComponent } from './components/add-app-user/add-app-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppPermissionDirective } from './core/directives/app-permission.directive';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    AddEntryComponent,
    AddDestinationComponent,
    BackupDatabaseComponent,
    DashboardComponent,
    AddAppUserComponent,
    AppPermissionDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRippleModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AppPermissionDirective],
})
export class AppModule {}
