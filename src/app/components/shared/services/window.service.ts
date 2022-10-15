import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  /**
   * Para utilizar com strings Unicode ou UTF-8, o Base64 encoding and decoding e essa nota em window.btoa().
   * var dadoCodificado = window.btoa("Olá, mundo"); // codifica a string
  var dadoDecodificado = window.atob(dadoCodificado); // decodifica a string
   */
  base64 = {
    encoding: (data) => {
      try {
        return of(window.btoa(JSON.stringify({ data: data }))).pipe(
          catchError((e) => {
            this.log.SEVERE({ component: 'WindowService', method: 'base64.encoding', value: JSON.stringify(data), error: e });
            return throwError(e);
          }));
      } catch (error) {
        this.log.SEVERE({ component: 'WindowService', method: 'base64.decoding', value: JSON.stringify(data), error: error });
        return throwError(error);
      }
    },
    decoding: (data) => {
      try {
        return of(JSON.parse(window.atob(data)).data).pipe(
          catchError((e) => {
            this.log.SEVERE({ component: 'WindowService', method: 'base64.decoding', value: JSON.stringify(data), error: e });
            return throwError(e);
          }));
      } catch (error) {
        this.log.SEVERE({ component: 'WindowService', method: 'base64.decoding', value: JSON.stringify(data), error: error });
        return throwError(error);
      }
    }
  };

  getUrl() {
    return of(location.href);
  }

  redirect(link: string): void {
    try {
      this.log.FINE(`window.location.replace : ${link}`);
      window.location.replace(`http://${link}`);
    } catch (e) {
      this.log.INFO(e);
    }
  }

  constructor(private log: LogService) { }

  // set scrollTop(value: number) {
  //   document.body.scrollTop = document.documentElement.scrollTop = value;
  // }

  scrollTop(document, value: number) {
    return document.documentElement.scrollTop = value;
  }

  get windowRef() {
    return window;
  }

  setStorage(key, value) {
    try {
      window.localStorage[key] = value;
    } catch (e) {
      this.log.INFO(e);
    }
  }

  getStorage(key) {
    try {
      return window.localStorage[key] || null;
    } catch (e) {
      this.log.INFO(e);
      return null;
    }
  }

  removeStorage(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      this.log.INFO(e);
    }
  }



}
