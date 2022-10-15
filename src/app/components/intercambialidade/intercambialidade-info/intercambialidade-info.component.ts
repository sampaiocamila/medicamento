import { BiologicosService } from './../../shared/services/biologicos.service';
import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';

@Component({
  selector: 'intercambialidade-info',
  templateUrl: 'intercambialidade-info.component.html',
  styles: [''],
  preserveWhitespaces: false
})
export class IntercambialidadeInfoComponent implements OnInit, OnDestroy {

  public isLive = false;
  public fb: FormGroup;
  public _fb;
  public submmit;
  public _paciente_medico;
  public administracao_input;
  public medicamento_input;
  private _form;

  @Output() public action = new EventEmitter();

  @Input() public set forms(_form) {
    if (_form && this._form != _form) {
      this._form = _form;
      if (this.isLive) {
        this.ngOnInit();
      }
    }
  }
  constructor(
    public log: LogService,
    private router: Router,
    public service: BiologicosService,
    public alert: AlertService
  ) {
    this.fb = new FormGroup({});
    this.fb.addControl(`situacao`, new FormControl('', Validators.required));
  }

  ngOnDestroy(): void {
    this.isLive = false;
    this.alert.clearAll();
  }

  ngOnInit(): void {
    this.isLive = true;
    if (this._form) {
      this.administracao_input = this._form.administracao;
      this._paciente_medico = { id: this._form.patient.id, enable: false };
      this.medicamento_input = {
        enable: false,
        medicine: this._form.medicine,
        pharmaceutical_form:
        {
          dose: this._form.pharmaceutical_form.dose,
          unit: this._form.pharmaceutical_form.unit,
          presentation: this._form.pharmaceutical_form.presentation
        },
        dosage: {
          route: this._form.dosage.route,
          intervalo: this._form.dosage.intervalo,
          duracao: this._form.dosage.duracao,
        },
        justification: this._form.justification,
        note: this._form.note,
        dilute: this._form.dilute
      };
    }
  }

  /**
   * metods
   */

   public back_stepper() {
    this.action.emit({ back_stepper: true });
  }

  public next_stepper() {

    if (this.fb.invalid) {
      this.fb.markAllAsTouched();
      return;
    }
    const data = this._form;
    data.notificacao = this.fb.value;
    // data.notificacao.responsavel = this.responsavel;
    data.notificacao.data_realizacao = new Date().toLocaleTimeString();
    this.service.addData(data);
    this.router.navigate(['/'], { skipLocationChange: false });
    this.alert.showToaster('Notificação realizada com sucesso !');
  }


}
