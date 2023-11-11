import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.storage.isLoggedIn()) {
      const authToken = this.storage.getUser().access_token;

      const isApiUrl = request.url.startsWith('/api');
      if (isApiUrl) {
        request = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${authToken}`)
        });
      }
    }

    return next.handle(request);
  }
}
