import { NgModule } from '@angular/core';
import { AppPermissionDirective } from './core/directives/app-permission.directive';

@NgModule({
  declarations: [AppPermissionDirective],
  exports: [AppPermissionDirective],
})
export class SharedModule {}
