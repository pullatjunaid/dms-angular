import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { DestinationListComponent } from 'src/app/pages/destination-list/destination-list.component';
import { EntriesComponent } from 'src/app/pages/entries/entries.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: EntriesComponent, canActivate: [AuthGuard] },
  {
    path: 'destination',
    component: DestinationListComponent,
    canActivate: [AuthGuard],
  },
];
