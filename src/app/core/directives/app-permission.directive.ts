import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[appPermission]',
})
export class AppPermissionDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // the role the user must have
  @Input() public appPermission: Array<string>;

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any> // private rolesService: RolesService
  ) {}

  public ngOnInit(): void {
    var permissions = localStorage.getItem('permissions');
    if (permissions) {
      var parsedPermissionsList = JSON.parse(permissions);
      const idx = parsedPermissionsList.findIndex(
        (element: any) => this.appPermission.indexOf(element.name) !== -1
      );
      if (idx < 0) {
        this.viewContainerRef.clear();
      } else {
        // appends the ref element to DOM
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
