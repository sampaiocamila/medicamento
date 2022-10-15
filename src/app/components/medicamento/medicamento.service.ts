import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(public http: HttpClient) {
    const _p = localStorage.getItem('medicamentos');
    if (!_p) {
      localStorage.setItem('medicamentos', JSON.stringify([]));
    }
  }

  public set medicamentos(_values) {
    localStorage.setItem('medicamentos', JSON.stringify(_values));
  }

  public addMedicamento(_value) {
    let _medicamentos: any[] = JSON.parse(localStorage.getItem('medicamentos'));
    if (!_medicamentos) {
      _medicamentos = [];
    }
    _medicamentos.push(_value);
    localStorage.setItem('medicamentos', JSON.stringify(_medicamentos));
  }

  public get medicamentos() {
    const _medicamentos = JSON.parse(localStorage.getItem('medicamentos'));
    let medicamentos = [];
    if (_medicamentos) {
      for (let index = 0; index < _medicamentos.length; index++) {
        let _p = _medicamentos[index];
        _p.id_prescription = index + 70;
        medicamentos.push(_p);
      }
    }
    return medicamentos;
  }



  /**
   * Unidades de medida
   * ref: https://ucum.org/trac/raw-attachment/wiki/adoption/common/TableOfExampleUcumCodesForElectronicMessagingWithPreface.pdf
   */
  private _unit_ucum = this.http.get<{ ucum_code: string, description_of_the_unit: string }[]>('assets/unit_ucum.json');

  public unit_ucum = {
    all: () => this._unit_ucum,
    by: (_any) => this._unit_ucum.pipe(map((_units) => {
      const filterValue = _any.toLowerCase().trim();
      return _units.filter(_v => {
        return JSON.stringify(_v).toLowerCase().trim().indexOf(filterValue) >= 0;
      });
    }))

  };

  /**
   * Unidade de apresentação da EMA
   * ref: https://spor.ema.europa.eu/rmswi/#/searchback/lists/200000000014/terms#search
   */
  private _presentation_ema = this.http.get<{ id: string, description: string }[]>('assets/unit_presentation_ema.json');

  public presentation_ema = {
    all: () => this._presentation_ema,
    by: (_any) => this._presentation_ema.pipe(map((_units_p_ema) => {
      const filterValue = _any.toLowerCase().trim();
      return _units_p_ema.filter(_v => {
        return JSON.stringify(_v).toLowerCase().trim().indexOf(filterValue) >= 0;
      });
    }))

  };

  /**
   * Via e metodos de administracao da EMA
   * ref: https://spor.ema.europa.eu/rmswi/#/lists/100000073345/terms
   */
  private _routes_ema = this.http.get<{ id: string, description: string }[]>('assets/routes_ema.json');

  public routes_ema = {
    all: () => this._routes_ema,
    by: (_any) => this._routes_ema.pipe(map((_routes) => {
      const filterValue = _any.toLowerCase().trim();
      return _routes.filter(_v => {
        return JSON.stringify(_v).toLowerCase().trim().indexOf(filterValue) >= 0;
      });
    }))

  };


}
