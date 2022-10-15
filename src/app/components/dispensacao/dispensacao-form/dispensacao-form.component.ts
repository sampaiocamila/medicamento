import { BiologicosService } from './../../shared/services/biologicos.service';
import {
  Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';

@Component({
  selector: 'dispensacao-form',
  templateUrl: './dispensacao-form.component.html',
  styleUrls: ['./dispensacao-form.component.scss'],
  preserveWhitespaces: false
})
export class DispensacaoFormComponent implements OnInit, OnDestroy {

  public isLive = false;
  public fb: FormGroup;
  public _fb;
  public submmit;
  public _paciente_medico;
  public medicamento_input;
  private _medicamento;
  private _form;
  public responsavel = {
    id: null,
    img: 'rimg.png',
    identificacao: 'Identificação do Emitente da Dispensação',
    nome: 'Alex Karev',
    formacao: 'Farmacêutico',
    dt_nascimento: '26/03/1966',
    conselho: '00000-0/SP',
    telefone: '+1 2064047000',
    hospital: {
      img: 'himg.jpg',
      nome: 'Grace Hospital (Seattle)',
      data: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString()
    }
  };

  @Output() public action = new EventEmitter();

  @Input() public set forms(_form) {
    if (_form && this._form != _form) {
      this._form = _form;
      if (this.isLive) {
        this.ngOnInit();
      }
    }
  }

  @HostListener('mouseleave') public onMouseLeave() {
    // this.keyupNumber();
    // this.blurDate();
  }

  constructor(
    public log: LogService,
    private router: Router,
    public service: BiologicosService,
    public alert: AlertService
  ) {
    this.fb = new FormGroup({});
    this.fb.addControl(`disponivel`, new FormControl(true, Validators.required));
    this.fb.addControl(`lote`, new FormControl('', Validators.required));
    this.fb.addControl(`validade`, new FormControl('', Validators.required));
    this.fb.addControl(`justificativa`, new FormControl('', Validators.required));
  }

  ngOnDestroy(): void {
    this.isLive = false;
    this.fb = null;
    this._fb = null;
    this.alert.clearAll();
  }

  ngOnInit(): void {
    this.isLive = true;
    if (this._form) {
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
      this._medicamento = this.medicamento_input;
    }
  }

  /**
   * metods
   */

  public set_medicamento(_medicamento) {
    this._medicamento = _medicamento;
  }

  public back_stepper() {
    this.action.emit({ back_stepper: true });
  }

  public next_stepper() {
    const data = this._form;
    data.dispensacao = this.fb.value;
    data.dispensacao.responsavel = this.responsavel;
    data.dispensacao.data_realizacao = new Date().toLocaleTimeString();
    this.service.addData(data);
    this.router.navigate(['/'], { skipLocationChange: false });
    this.alert.showToaster('Dispensação realizada com sucesso !');
  }

}
