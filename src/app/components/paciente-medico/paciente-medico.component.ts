import { of } from 'rxjs';
import { catchError, map, startWith, takeWhile } from 'rxjs/operators';

import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../shared/services/alert.service';
import { IntercambialidadeDialogComponent } from '../intercambialidade/intercambialidade-dialog/intercambialidade-dialog.component';
import { RastreabilidadeDialogComponent } from '../rastreabilidade/rastreabilidade-dialog/rastreabilidade-dialog.component';

@Component({
  selector: 'paciente-medico',
  templateUrl: 'paciente-medico.component.html',
  styles: [''],
  preserveWhitespaces: false
})
export class PacienteMedicoComponent implements OnInit, OnDestroy {

  public isLive = false;
  public enable = true;
  public _himg = 'himg.jpg';
  public _pacienteimg = 'pacienteImg.jpg';
  public editarpaciente;

  public responsavel = {
    id: null,
    img: 'drimg.jpg',
    identificacao: 'Identificação do Emitente',
    nome: 'Dr. Derek Christopher Shepherd',
    formacao: 'Médico - Reumatologista',
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

  public _local_selected: any = {
    nome: 'Grace Hospital (Seattle)',
    data: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  };

  public _paciente_selected: any = {
    id: null,
    nome: '',
    reg_hosp: '',
    genero: '',
    peso: '',
    dt_nascimento: '',
    cpf: '000.000.000-00',
    telefone: '000.000.000-00',
    endereco: '',
    idade: ''
  };

  public _opened_paciente;
  private lists_temp: any[] = [];
  public filtered_paciente = of<any[]>([]);
  public _id_pacienteCtrl = new FormControl('', Validators.required);
  @ViewChild('input_paciente') public input_paciente: ElementRef<HTMLInputElement>;

  @Input() public set paciente(_p) {

    if (_p && _p.id) {
      const _id = _p.id;
      const _enable = _p.enable;
      this.enable = _enable === false ? false : true;
      if (_id && _id.trim()) {
        const _i_selected = this.lists_temp.find(_is => {
          const _v = _is.id;
          const value = _id;
          return _v.trim() === value.trim();
        });

        if (_i_selected) {
          this._paciente_selected = _i_selected;
          this._pacienteimg = this._paciente_selected.img;
          this._paciente_selected.idade = this.getAno(this._paciente_selected.dt_nascimento);
          this._id_pacienteCtrl.setValue(this._paciente_selected.id);
          this.event();
        }
      }
    }
  }

  @Output() public action = new EventEmitter<{ patient: any; doctor: any; hospital: any }>();

  private event() {
    const _data = {
      patient: this._paciente_selected,
      doctor: this.responsavel,
      hospital: this.responsavel.hospital
    };
    this.action.emit(_data);
  }

  constructor(
    public dialog: MatDialog,
    public alert: AlertService) {
  }

  ngOnDestroy(): void {
    this.isLive = false;
    this.lists_temp = [];
    this.alert.clearAll();
  }

  ngOnInit(): void {
    this.isLive = true;
    this.loadList();
  }

  /**
   * Methods
   */

  public remove_paciente() {
    this._opened_paciente = false;
    this._pacienteimg = 'pacienteImg.jpg';
    this._id_pacienteCtrl.setValue('');
    this._paciente_selected = {
      id: null,
      nome: '',
      reg_hosp: '',
      genero: '',
      peso: '',
      dt_nascimento: '',
      cpf: '000.000.000-00',
      telefone: '000.000.000-00',
      endereco: '',
      idade: ''
    };
  }

  public blur_paciente() {
    this.input_paciente.nativeElement.value = '';
    this._opened_paciente = false;
  }

  public selected_paciente(event?) {
    if (event && event.option && event.option.value && event.option.value.trim()) {
      const _i_selected = this.lists_temp.find(_is => {
        const _v = _is.id;
        const value = event.option.value;
        return _v.trim() === value.trim();
      });

      if (_i_selected) {
        this._paciente_selected = _i_selected;
        this._pacienteimg = this._paciente_selected.img;
        this._paciente_selected.idade = this.getAno(this._paciente_selected.dt_nascimento);
        this._id_pacienteCtrl.setValue(this._paciente_selected.id);
        this.event();
      }
    }

  }

  private _filter_paciente(value: string, all: any[]): any[] {
    const filterValue = value.toLowerCase().trim();

    return all.filter(_v => {
      return JSON.stringify(_v).toLowerCase().trim().indexOf(filterValue) >= 0;
    });
  }

  private getAno(data: string) {
    const _result: any = new Date().getFullYear() - new Date(data).getFullYear();
    return _result > 0 ? _result : 'Problemas com a idade';
  }

  public intercambialidade() {
    this.dialog.open(IntercambialidadeDialogComponent, { data: this._paciente_selected });
  }

  public rastreabilidade() {
    this.dialog.open(RastreabilidadeDialogComponent, { data: this._paciente_selected });
  }

  /**
   * Loads
   */

  private loadList() {

    this._paciente_selected = {
      id: null,
      nome: '',
      reg_hosp: '',
      genero: '',
      peso: '',
      dt_nascimento: '',
      cpf: '000.000.000-00',
      telefone: '000.000.000-00',
      endereco: '',
      idade: ''
    };
    this._id_pacienteCtrl.setValue('');
    this._opened_paciente = false;

    // this.service.lists.pacientes().pipe(
    //   takeWhile(() => this.isLive)
    // ).subscribe(_l => {
    this.lists_temp = [
      {
        id: '1',
        img: 'mig.jpg',
        nome: 'Miguel da Silva',
        reg_hosp: '2345678',
        genero: 'Masculino',
        peso: '80kg',
        dt_nascimento: '06/06/1990',
        cpf: '999.999.999-99',
        telefone: '+55 11 948288573',
        endereco: 'Rua adma jafer, 85, Jardins, CEP:06394-045 São Paulo -SP',
        idade: ''
      },
      {
        id: '2',
        img: 'val.jpg',
        nome: 'Valentina da Silva',
        reg_hosp: '5675430',
        genero: 'Feminino',
        peso: '50kg',
        dt_nascimento: '03/03/1991',
        cpf: '777.777.777-77',
        telefone: '+55 (11) 777777777',
        endereco: 'Rua Peixoto gomide, 77, Jardins, CEP:06774-045 São Paulo -SP',
        idade: ''
      }
    ];
    // });


    this.filtered_paciente = this._id_pacienteCtrl.valueChanges.pipe(
      takeWhile(() => this.isLive),
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((_value: string | null) => {
        let _is: any[] = this.lists_temp;
        if (_value && _value.trim()) {
          _is = this._filter_paciente(_value, _is);
        }
        return _is;
      }),
      catchError(e => {
        return this.lists_temp;
      })
    );

  }

}
