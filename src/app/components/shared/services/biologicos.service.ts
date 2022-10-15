import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class BiologicosService {
  constructor(public http: HttpClient) {
    const _p = localStorage.getItem("datas");
    if (!_p) {
      localStorage.setItem("datas", JSON.stringify([]));
    }
  }

  public set datas(_value) {
    localStorage.setItem("datas", JSON.stringify(_value));
  }

  public addData(_value) {
    const _valores = localStorage.getItem("datas");
    if (_valores &&
      _valores.toLowerCase().indexOf(JSON.stringify(_value).toLowerCase()) >= 0
    ) {
      return;
    }
  
    let _datas: any[] = JSON.parse(_valores);
    if (!_datas) {
      _datas = [];
    }

    if(_value.id >= 0 && _datas[_value.id]){
      _datas[_value.id] = _value;
    }else{
      _datas.push(_value);
    }
    localStorage.setItem("datas", JSON.stringify(_datas));
  }

  public get datas() {
    let _datas: any[] = JSON.parse(
      localStorage.getItem("datas")
    );
    if (_datas) {
      for (let index = 0; index < _datas.length; index++) {
        _datas[index].id = index;
      }
    }
    return _datas;
  }

}
