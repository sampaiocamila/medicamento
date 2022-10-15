

import { Mock } from 'src/app/components/shared';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(private http: HttpClient) { }


  private _mock: Mock;


  /**
   * #### Serviço que retorna valores presentes no arquivo de mock do projeto
   */
  // getMock() {
  //     if (this._mock) {
  //         return of(this._mock);
  //     }
  //     if (this.http) {
  //         return this.http.get<Mock>(environment.mock).pipe(tap(mock => this._mock = mock));
  //     }
  // }


}
