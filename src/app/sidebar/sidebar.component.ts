import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/entries', title: 'Entries', icon: 'list', class: '' },
  {
    path: '/destination',
    title: 'Destination',
    icon: 'location_on',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    if (
      this.authService.hasPermission([
        'backup.create',
        'backup.delete',
        'backup.edit',
        'backup.view',
      ])
    ) {
      ROUTES.push({
        path: '/backup-database',
        title: 'Backup Database',
        icon: 'backup',
        class: '',
      });
    }
    if (
      this.authService.hasPermission([
        'appUser.create',
        'appUser.delete',
        'appUser.edit',
        'appUser.view',
        'appUser.resetPassword',
      ])
    ) {
      ROUTES.push({
        path: '/app-users',
        title: 'App Users',
        icon: 'supervised_user_circle',
        class: '',
      });
    }

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
