import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addHeaders(request));
  }

  addHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let headers: any = {};

    if (this.authService.isLoggedIn) {
      // Adding Auth Token
      headers = {
        ...headers,
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
      };
    }

    return request.clone({
      setHeaders: headers,
    });
  }
}
