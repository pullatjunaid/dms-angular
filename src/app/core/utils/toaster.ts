import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class customTosters {
  constructor(private toastr: ToastrService) {}
  simpleToaster(message: string) {
    this.toastr.success(message, '', {
      positionClass: 'toast-bottom-center',
    });
  }
}
