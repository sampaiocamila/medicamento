import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  public info = { desc1: '', desc2: '', link: '' };
  setInfo(_i) {
    this.info.desc1 = _i.desc1;
    this.info.desc2 = _i.desc2;
    this.info.link = _i.link;
  }
}
