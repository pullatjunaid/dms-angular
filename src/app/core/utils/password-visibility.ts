import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class passwordVisibilityToggle {
  check(document: any) {
    var x = document.getElementById('myInput');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }
}
