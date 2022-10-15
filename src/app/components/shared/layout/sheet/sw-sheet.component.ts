import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'sw-sheet',
  template: `<mat-nav-list>
                    <a mat-list-item (click)="confirm($event)" style="background-color: #00fba730;">
                      <span mat-line>Nova versão disponível!</span>
                      <span mat-line>Atualizar!</span>
                    </a>

                    <a mat-list-item (click)="cancel($event)">
                      <span mat-line>Agora não!</span>
                    </a>
                </mat-nav-list>
                ` })
// tslint:disable-next-line:member-ordering
export class SWSheetComponent {

  constructor(private _swSheetRef: MatBottomSheetRef<SWSheetComponent>) { }

  public confirm(event: MouseEvent): void {
    this._swSheetRef.dismiss();
    event.preventDefault();
    window.location.reload();
  }

  public cancel(event: MouseEvent): void {
    this._swSheetRef.dismiss();
    event.preventDefault();
  }
}
