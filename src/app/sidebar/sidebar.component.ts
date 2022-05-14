import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
  { path: '/entries', title: 'Entries', icon: 'nc-tile-56', class: '' },
  {
    path: '/destination',
    title: 'Destination',
    icon: 'nc-caps-small',
    class: '',
  },
  {
    path: '/backup-database',
    title: 'Backup Database',
    icon: 'nc-tile-56',
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
  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
