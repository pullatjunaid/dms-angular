import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntriesComponent } from 'src/app/pages/entries/entries.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DestinationListComponent } from 'src/app/pages/destination-list/destination-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { AppUsersListComponent } from 'src/app/pages/app-users-list/app-users-list.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    EntriesComponent,
    DestinationListComponent,
    AppUsersListComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSortModule,
    SharedModule,
  ],
  declarations: [
    EntriesComponent,
    DestinationListComponent,
    AppUsersListComponent,
  ],
})
export class AdminLayoutModule {}
