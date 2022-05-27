import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { AppUsersListComponent } from 'src/app/pages/app-users-list/app-users-list.component';
import { BackupDatabaseComponent } from 'src/app/pages/backup-database/backup-database.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { DestinationListComponent } from 'src/app/pages/destination-list/destination-list.component';
import { EntriesComponent } from 'src/app/pages/entries/entries.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'entries', component: EntriesComponent, canActivate: [AuthGuard] },
  {
    path: 'destination',
    component: DestinationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'backup-database',
    component: BackupDatabaseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app-users',
    component: AppUsersListComponent,
    canActivate: [AuthGuard],
  },
];
