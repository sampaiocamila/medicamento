import { of } from 'rxjs';
import { catchError, map, startWith, switchMap, takeWhile } from 'rxjs/operators';

import {
  Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { AlertService } from '../shared/services/alert.service';
import { MedicamentoService } from './medicamento.service';

@Component({
  selector: 'medicamento',
  templateUrl: 'medicamento.component.html',
  styles: [''],
  preserveWhitespaces: false
})
export class MedicamentoComponent implements OnInit, OnDestroy {

  public isLive = false;
  public enable = true;
  public _medicamento = {
    enable: false,
    medicine: '',
    pharmaceutical_form:
    {
      dose: '',
      unit: '',
      presentation: ''
    },
    dosage: {
      route: '',
      intervalo: '',
      duracao: '',
    },
    justification: '',
    lote: null,
    validade: null,
    note: '',
    dilute: false
  };
  public _opened_medicamento;

  private medicamentos_temp: any[] = [];
  public filtered_medicamento = of<any[]>([]);
  public _medicamento_selected = { id: '', nome: '' };
  public _id_medicamentoCtrl = new FormControl('', Validators.required);
  @ViewChild('input_medicamento') input_medicamento: ElementRef<HTMLInputElement>;

  public fb;
  public _opened_unit;
  public is_dilutable = true;
  private units_temp: any[] = [];
  public filtered_unit = of<any[]>([]);
  public _id_unitCtrl = new FormControl('', Validators.required);
  @ViewChild('input_unit') input_unit: ElementRef<HTMLInputElement>;

  public _unit_selected = {
    ucum_code: '',
    description_of_the_unit: ''
  };

  public _presentation_selected = {
    id: '',
    description: ''
  };
  public _opened_presentation;
  private presentations_temp: any[] = [];
  public filtered_presentation = of<any[]>([]);
  public _id_presentationCtrl = new FormControl('', Validators.required);
  @ViewChild('input_presentation') input_presentation: ElementRef<HTMLInputElement>;

  public _route_selected = {
    id: '',
    description: ''
  };
  public _opened_route;
  private routes_temp: any[] = [];
  public filtered_route = of<any[]>([]);
  public _id_routeCtrl = new FormControl('', Validators.required);
  @ViewChild('input_route') input_route: ElementRef<HTMLInputElement>;

  @Input() public set medicamento(_medicamento) {
    if (_medicamento) {
      this.enable = _medicamento.enable;
      this._medicamento = _medicamento;
      if (this.isLive && this.enable) {
        this.ngOnInit();
      }
    }
  }

  @Output() public action = new EventEmitter();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private service: MedicamentoService,
    public alert: AlertService) {
    this.fb = new FormGroup({});
    this.fb.addControl(`dose`, new FormControl('', Validators.compose([
      Validators.required, Validators.min(0)])));
    this.fb.addControl(`interval`, new FormControl('', Validators.required));
    this.fb.addControl(`duration`, new FormControl('', Validators.required));
    this.fb.addControl(`justification`, new FormControl('', Validators.required));
    this.fb.addControl(`note`, new FormControl('', Validators.required));

  }

  ngOnDestroy(): void {
    this.isLive = false;
    this._medicamento = null;
    this.alert.clearAll();
  }

  ngOnInit(): void {
    this.isLive = true;
    if (!this.enable) {
      return;
    }
    const medicine = { event: { option: { value: this._medicamento.medicine } } };
    this.selected_medicamento(medicine);
    this.fb.controls.dose.setValue(this._medicamento.pharmaceutical_form.dose);
    const unit = { event: { option: { value: this._medicamento.pharmaceutical_form.unit } } };
    this.selected_unit(unit);
    const presentation = { event: { option: { value: this._medicamento.pharmaceutical_form.presentation } } };
    this.selected_presentation(presentation);
    const route = { event: { option: { value: this._medicamento.dosage.route } } };
    this.selected_route(route);
    this.fb.controls.interval.setValue(this._medicamento.dosage.intervalo);
    this.fb.controls.duration.setValue(this._medicamento.dosage.duracao);
    this.is_dilutable = this._medicamento.dilute;
    this.fb.controls.justification.setValue(this._medicamento.justification);
    this.fb.controls.note.setValue(this._medicamento.note);
    this.event();
    this.loadMedicamentos();
    this.loadUnits();
    this.loadPresentation();
    this.loadRoutes();
  }
  /**
   * Methods
   */

  private event() {
    const _data = {
      medicine: this._id_medicamentoCtrl,
      pharmaceutical_form:
      {
        dose: this.fb.controls.dose,
        unit: this._id_unitCtrl,
        presentation: this._id_presentationCtrl
      },
      dosage: {
        route: this._id_routeCtrl,
        intervalo: this.fb.controls.interval,
        duracao: this.fb.controls.duration,
      },
      justification: this.fb.controls.justification,
      note: this.fb.controls.note,
      dilute: this.is_dilutable
    };
    this.action.emit(_data);
  }

  public remove_medicamento() {
    this._opened_medicamento = false;
    this._id_medicamentoCtrl.setValue('');
    this._medicamento_selected = {
      id: null,
      nome: ''
    };
    this.event();
  }

  public blur_medicamento() {
    this.input_medicamento.nativeElement.value = '';
    this._opened_medicamento = false;
    this.event();
  }

  public selected_medicamento(event?) {
    if (event && event.option && event.option.value && event.option.value.trim()) {
      const _i_selected = this.medicamentos_temp.find(_is => {
        const _v = _is.id;
        const value = event.option.value;
        return _v.trim() === value.trim();
      });

      if (_i_selected) {
        this._medicamento_selected = _i_selected;
        this._id_medicamentoCtrl.setValue(this._medicamento_selected.id);
        this.is_dilutable = _i_selected.id !== '1';
      }
    }
    this.event();
  }

  private _filter_medicamento(value: string, all: any[]): any[] {
    const filterValue = value.toLowerCase().trim();
    return all.filter(_v => {
      return JSON.stringify(_v).toLowerCase().trim().indexOf(filterValue) >= 0;
    });
  }

  public remove_unit() {
    this._opened_unit = false;
    this._id_unitCtrl.setValue('');
    this._unit_selected = {
      ucum_code: null,
      description_of_the_unit: ''
    };
    this.event();
  }

  public blur_unit() {
    this.input_unit.nativeElement.value = '';
    this._opened_unit = false;
    this.event();
  }

  public selected_unit(event?) {
    if (event && event.option && event.option.value && event.option.value.trim()) {
      const _i_selected = this.units_temp.find(_is => {
        const _v = _is.ucum_code;
        const value = event.option.value;
        return _v.trim() === value.trim();
      });

      if (_i_selected) {
        this._unit_selected = _i_selected;
        this._id_unitCtrl.setValue(this._unit_selected.ucum_code);
      }
    }
    this.event();
  }

  public remove_presentation() {
    this._opened_presentation = false;
    this._id_presentationCtrl.setValue('');
    this._presentation_selected = {
      id: null,
      description: ''
    };
    this.event();
  }

  public blur_presentation() {
    this.input_presentation.nativeElement.value = '';
    this._opened_presentation = false;
    this.event();
  }

  public selected_presentation(event?) {
    if (event && event.option && event.option.value && event.option.value.trim()) {
      const _i_selected = this.presentations_temp.find(_is => {
        const _v = _is.id;
        const value = event.option.value;
        return _v.trim() === value.trim();
      });

      if (_i_selected) {
        this._presentation_selected = _i_selected;
        this._id_presentationCtrl.setValue(this._presentation_selected.id);
      }
    }
    this.event();
  }

  public remove_route() {
    this._opened_route = false;
    this._id_routeCtrl.setValue('');
    this._route_selected = {
      id: null,
      description: ''
    };
    this.event();
  }

  public blur_route() {
    this.input_route.nativeElement.value = '';
    this._opened_route = false;
    this.event();
  }

  public selected_route(event?) {
    if (event && event.option && event.option.value && event.option.value.trim()) {
      const _i_selected = this.routes_temp.find(_is => {
        const _v = _is.id;
        const value = event.option.value;
        return _v.trim() === value.trim();
      });

      if (_i_selected) {
        this._route_selected = _i_selected;
        this._id_routeCtrl.setValue(this._route_selected.id);
      }
    }
    this.event();
  }

  /**
   * Loads
   */

  private loadMedicamentos() {

    this._medicamento_selected = {
      id: null,
      nome: ''
    };
    this._id_medicamentoCtrl.setValue('');
    this._opened_medicamento = false;

    this.medicamentos_temp = [
      {
        id: 'Azul',
        nome: 'Biologico Azul'
      },
      {
        id: 'Amarelo',
        nome: 'Biologico Amarelo'
      },
      {
        id: 'Biossimilar amarelado',
        nome: 'Biossimilar amarelado'
      },
      {
        id: 'Biossimilar azulado',
        nome: 'Biossimilar azulado'
      },
      {
        id: 'Rosa',
        nome: 'Biologico rosa'
      },
      {
        id: '6',
        nome: 'Biologico rosinha'
      },
      {
        id: 'Verde',
        nome: 'Biologico verde'
      },
      {
        id: 'Verde',
        nome: 'Biossimilar verde'
      },
    ];

    this.filtered_medicamento = this._id_medicamentoCtrl.valueChanges.pipe(
      takeWhile(() => this.isLive),
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((_value: string | null) => {
        let _is: any[] = this.medicamentos_temp;
        if (_value && _value.trim()) {
          _is = this._filter_medicamento(_value, _is);
        }
        return _is;
      }),
      catchError(e => {
        return this.medicamentos_temp;
      })
    );

  }

  private loadUnits() {

    this._unit_selected = {
      ucum_code: null,
      description_of_the_unit: ''
    };
    this._id_unitCtrl.setValue('');
    this._opened_unit = false;

    this.service.unit_ucum.all().pipe(
      takeWhile(() => this.isLive)
    ).subscribe(_units_temp => {
      this.units_temp = _units_temp;
    });

    this.filtered_unit = this._id_unitCtrl.valueChanges.pipe(
      takeWhile(() => this.isLive),
      // tslint:disable-next-line: deprecation
      startWith(null),
      switchMap((_value: string | null) => {
        if (_value && _value.trim()) {
          return this.service.unit_ucum.by(_value);
        }
        return this.service.unit_ucum.all();
      }),
      catchError(e => {
        return this.units_temp;
      })
    );

  }

  private loadPresentation() {

    this._presentation_selected = {
      id: null,
      description: ''
    };
    this._id_presentationCtrl.setValue('');
    this._opened_presentation = false;

    this.service.presentation_ema.all().pipe(
      takeWhile(() => this.isLive)
    ).subscribe(_presentations_temp => {
      this.presentations_temp = _presentations_temp;
    });

    this.filtered_presentation = this._id_presentationCtrl.valueChanges.pipe(
      takeWhile(() => this.isLive),
      // tslint:disable-next-line: deprecation
      startWith(null),
      switchMap((_value: string | null) => {
        if (_value && _value.trim()) {
          return this.service.presentation_ema.by(_value);
        }
        return this.service.presentation_ema.all();
      }),
      catchError(e => {
        return this.presentations_temp;
      })
    );

  }

  private loadRoutes() {

    this._route_selected = {
      id: null,
      description: ''
    };
    this._id_routeCtrl.setValue('');
    this._opened_route = false;

    this.service.routes_ema.all().pipe(
      takeWhile(() => this.isLive)
    ).subscribe(_routes_temp => {
      this.routes_temp = _routes_temp;
    });

    this.filtered_route = this._id_routeCtrl.valueChanges.pipe(
      takeWhile(() => this.isLive),
      // tslint:disable-next-line: deprecation
      startWith(null),
      switchMap((_value: string | null) => {
        if (_value && _value.trim()) {
          return this.service.routes_ema.by(_value);
        }
        return this.service.routes_ema.all();
      }),
      catchError(e => {
        return this.routes_temp;
      })
    );

  }

}
