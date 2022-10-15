import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

import { AlertService } from '../shared/services/alert.service';
import { BiologicosService } from '../shared/services/biologicos.service';

@Component({
  selector: 'prescricao',
  templateUrl: 'prescricao.component.html',
  styleUrls: ['./prescricao.component.scss'],
  preserveWhitespaces: false,
})

export class PrescricaoComponent implements OnInit, OnDestroy {

  public isLive = false;
  public _paciente_medico;
  public paciente;
  public medicamento;
  private _medicamento;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private service: BiologicosService,
    public alert: AlertService) {
  }

  ngOnDestroy(): void {
    this.isLive = false;
    this.alert.clearAll();
  }

  ngOnInit(): void {
    this.isLive = true;
  }

  /**
   * Methods
   */

  public set_paciente_medico(_paciente_medico) {
    this._paciente_medico = _paciente_medico;
  }
  public set_medicamento(_medicamento) {
    this._medicamento = _medicamento;
  }

  public prescrever(): void {

    if (!this._paciente_medico) {
      this.alert.showToaster('Selecione o Paciente, por favor !');
      return;
    }

    if (this._medicamento.pharmaceutical_form.unit.invalid) {
      this.alert.showToaster(AlertService.MSG_LIST._3_CHECK_REQUIREDS);
      return;
    }

    if (this._medicamento.pharmaceutical_form.presentation.invalid) {
      this.alert.showToaster(AlertService.MSG_LIST._3_CHECK_REQUIREDS);
      return;
    }

    if (this._medicamento.dosage.route.invalid) {
      this.alert.showToaster(AlertService.MSG_LIST._3_CHECK_REQUIREDS);
      return;
    }

    if (this._medicamento.medicine.invalid) {
      this.alert.showToaster(AlertService.MSG_LIST._3_CHECK_REQUIREDS);
      return;
    }

    const prescription = {
      patient: this._paciente_medico.patient,
      doctor: this._paciente_medico.doctor,
      hospital: this._paciente_medico.hospital,
      medicine: this._medicamento.medicine.value,
      pharmaceutical_form:
      {
        dose: this._medicamento.pharmaceutical_form.dose.value,
        unit: this._medicamento.pharmaceutical_form.unit.value,
        presentation: this._medicamento.pharmaceutical_form.presentation.value
      },
      dosage: {
        route: this._medicamento.dosage.route.value,
        intervalo: this._medicamento.dosage.intervalo.value,
        duracao: this._medicamento.dosage.duracao.value,
      },
      justification: this._medicamento.justification.value,
      note: this._medicamento.note.value,
      dilute: this._medicamento._dilute ? true : false

    };
    this._bottomSheet.open(BottomSheetPrescription, { data: prescription });
  }

}

@Component({
  selector: 'bottom-sheet-prescription',
  template: `
   <h2 class="hraleway" style="color: #6959CD!important;">Confirmar prescrição ?</h2>
    <div class="division" style="display: flex;padding: 7px;">
          <button mat-raised-button (click)="send()" style="margin:auto; background-color:#03bb2b">Sim</button>
          <button mat-raised-button (click)="close()" style="margin:auto; background-color:#d84b4b">Não</button>
        </div>
`,
})
// tslint:disable-next-line: component-class-suffix
export class BottomSheetPrescription {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetPrescription>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data,
    private service: BiologicosService,
    private router: Router,
    public alert: AlertService) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  send() {
    this.service.addData(this.data);
    this._bottomSheetRef.dismiss();
    this.router.navigate(['/'], { skipLocationChange: false });
    this.alert.showToaster('Prescrição realizada com sucesso !');
  }

}
