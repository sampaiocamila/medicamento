import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ControlBuilder } from '../../shared';
import { ElementListEvents } from '../../shared/layout/element-list';
import { SheetComponent, SheetService } from '../../shared/layout/sheet';

import { AlertService } from '../../shared/services/alert.service';
import { BiologicosService } from '../../shared/services/biologicos.service';
import { FileService } from '../../shared/services/file.service';
import { LogService } from '../../shared/services/log.service';

@Component({
  selector: 'rastreabilidade-dialog',
  templateUrl: 'rastreabilidade-dialog.component.html',
  styles: [
    `td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; }`,
    ` tr:nth-child(even) { background-color: #dddddd; }`
  ],
})
// tslint:disable-next-line: component-class-suffix
export class RastreabilidadeDialogComponent implements OnInit, OnDestroy {

  @ViewChild('pdf') pdf;

  public fb;
  private isLive;
  public href;
  public values;
  public settings;
  private paciente_selected;
  public _form;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    public alert: AlertService,
    public el: ElementRef,
    public log: LogService,
    public file: FileService,
    public service: BiologicosService,
    private sheet: MatBottomSheet,
    private sheetService: SheetService
  ) {
    this.paciente_selected = data;
  }

  ngOnInit(): void {
    this.isLive = true;
  }

  ngOnDestroy(): void {
    this.isLive = false;
    this.fb = null;
    this.href = null;
    this.paciente_selected = null;
    this._form = null;
    this.isLive = null;
    this.values = null;
    this.settings = null;
  }

  ngAfterViewInit(): void {

    this.isLive = true;

    this.settings = of({
      show_action: {
        search: true,
        edit: false,
        remove: false,
        radio: false,
        name: '',
        consulta_label: 'Consultar',
        consulta_placeholder: 'Digite aqui algo relacionado a listagem'
      }
    });
    const _lresult = [];
    let datas = this.service.datas.filter(({ patient }) => patient.id == this.paciente_selected.id && patient.cpf == this.paciente_selected.cpf);

    if (this._form && this._form.paciente_selected) {
      const paciente_selected = this._form.paciente_selected;
      datas = this.service.datas.filter(({ patient }) => patient.id == paciente_selected.id && patient.cpf == paciente_selected.cpf);
    }

    datas.forEach((data) => {
      const _v = this.builderData(data);
      _lresult.push(_v);
    });
    this.values = of({ push: _lresult });

  }

  /**
   * Methods
   */

  private getRastreabilidade(data){
    const result = [];
    if(data.dispensacao){
      if(data.dispensacao.disponivel){
        result.push({value: 'check_circle', descricao: 'Medicamento prescrito e dispensado'});
      } else {
        result.push({value: 'compare_arrows', descricao: 'Medicamento dispensado diferente do prescrito'});
      }
    }

    if(data.notificacao){
      result.push({value: 'report_problem', descricao: 'Evento Adverso Relatado'});
    } else if (data.administracao) {
      result.push({value: 'change_history', descricao: 'Sem relato de evento adverso'});
    }

    return JSON.stringify(result);
  }

  public elementListEvent(e: ElementListEvents) {
    if (e) {
      if (e.view) {
        // this._form = this.service..find( (data) => e.view.id_ad == data.id_prescription);
      } else if (e.filteredData) {
        const _info = {
          desc1: `"${e.filteredData}" não foi encontrado !`,
          desc2: `Por favor verifique se a informação esta correta ! `
        };
        this.sheetService.setInfo(_info);
        this.sheet.open(SheetComponent);
      } else if (e.error) {
        this.alert.showToaster(LogService.LISTA_DE_CODIGOS_E_STATUS._1_INFORMATIVA);
      }
    }
  }

  public formEvent(event) {
    if (event) {
      if (event.back_stepper) {
        this._form = null;
      }
    }
  }

  public builderData(data): ControlBuilder[] {
    return [
      {
        displayed: 'ID', placeholder: 'ID',
        favorite: '0', name: 'id', value: data.id,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Id do paciente', placeholder: 'Id do paciente',
        favorite: '1', name: 'id_paciente', value: data.patient.id,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Nome do paciente', placeholder: 'Nome do paciente',
        favorite: '2', name: 'paciente', value: data.patient.nome,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Registro Hospitalar', placeholder: 'Registro Hospitalar',
        favorite: '3', name: 'reg_hosp', value: data.patient.reg_hosp,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Imagem do perfil', placeholder: 'Imagem do perfil',
        favorite: null, name: 'img', value: data.patient.img,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Genero', placeholder: 'Genero',
        favorite: null, name: 'genero', value: data.patient.genero,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Data de nascimento', placeholder: 'Data de nascimento',
        favorite: null, name: 'dt_nascimento', value: data.patient.dt_nascimento,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'CPF', placeholder: 'CPF',
        favorite: null, name: 'cpf', value: data.patient.cpf,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Telefone', placeholder: 'Telefone',
        favorite: null, name: 'telefone', value: data.patient.telefone,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Endereco', placeholder: 'Endereco',
        favorite: null, name: 'endereco', value: data.patient.endereco,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Id do emitente', placeholder: 'Id do emitente',
        favorite: null, name: 'doctor_id', value: data.doctor.id,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Nome do emitente', placeholder: 'Nome do emitente',
        favorite: '4', name: 'doctor_name', value: data.doctor.nome,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Formação do emitente', placeholder: 'Formação do emitente',
        favorite: null, name: 'doctor_formacao', value: data.doctor.formacao,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Nascimento do emitente', placeholder: 'Nascimento do emitente',
        favorite: null, name: 'doctor_dt_nascimento', value: data.doctor.dt_nascimento,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Conselho do emitente', placeholder: 'Conselho do emitente',
        favorite: null, name: 'doctor_conselho', value: data.doctor.conselho,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Telefone do emitente', placeholder: 'Telefone do emitente',
        favorite: null, name: 'doctor_telefone', value: data.doctor.telefone,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Data e Hora', placeholder: 'Data e Hora',
        favorite: '5', name: 'time', value: `${data.hospital.data} - ${data.hospital.hora}`,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Hospital', placeholder: 'Hospital',
        favorite: null, name: 'nome_hospital', value: data.hospital.nome,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Medicamento', placeholder: 'Medicamento',
        favorite: '6', name: 'medicine', value: ` ${data.medicine}`,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Forma farmaceutica', placeholder: 'Forma farmaceutica',
        favorite: null, name: 'pharmaceutical_form', value: `Dose: ${data.pharmaceutical_form.dose}, Unidade de medida: ${data.pharmaceutical_form.unit}, Apresentação: ${data.pharmaceutical_form.presentation} `,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Posologia', placeholder: 'Posologia',
        favorite: null, name: 'dosage', value: `Via de administração: ${data.dosage.route}, Intervalo: ${data.dosage.intervalo}, Duração: ${data.dosage.duracao} `,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Diluir', placeholder: 'Diluir',
        favorite: null, name: 'dilute', value: data.dilute,
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'notificacao', placeholder: 'notificacao',
        favorite: null, name: 'notificacao', value: JSON.stringify(data?.notificacao),
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'dispensacao', placeholder: 'dispensacao',
        favorite: null, name: 'dispensacao', value: JSON.stringify(data?.dispensacao),
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'administracao', placeholder: 'administracao',
        favorite: null, name: 'administracao', value: JSON.stringify(data?.administracao),
        validators: [], disabled: true, hideRequired: true
      },
      {
        displayed: 'Rastreabilidade', placeholder: '',
        favorite: '7', name: 'icons', value: this.getRastreabilidade(data),
        validators: [], disabled: true, hideRequired: true
      },
    ];
  }

  public export() {

    const _html = this.pdf.nativeElement;

    if (this.isLive) {
      this.file.export.pdfByHtml(_html, this.paciente_selected.cpf);
    }

  }
}
