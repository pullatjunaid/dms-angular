import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermission]',
})
export class AppPermissionDirective {
  @Input() set appPermission(permissionList: Permissions[]) {
    console.log(permissionList);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    // if (this.permissionService.isUserAllowed(this.requiredPermissionList)) {
    //   this.viewContainerRef.createEmbeddedView(this.templateRef);
    // } else {
    //   this.viewContainerRef.clear();
    // }
  }
}
