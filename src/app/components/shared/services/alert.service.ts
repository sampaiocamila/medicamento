import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // TODO analizar melhoria em criar observable do msg para utilizar pipe( distinct() e debounceTime()

  constructor(private snackBar: MatSnackBar) { }

  public static readonly duration = 3000;
  /**
   * @example this.alert.showToaster(AlertService.MSG_LIST._28_SEARCH_SAVED);
   */
  public static readonly MSG_LIST = {
    _1_ERROR_COPY_LINK: 'Ocorreu um problema ao copiar o Link!',
    _2_SUCESS_COPY_LINK: 'Link copiado !',
    _3_CHECK_REQUIREDS: 'Por favor, verifique os campos obrigatorios !',
    _4_CHECK_EMPTY: 'Por favor, verifique se os campos estão preenchidos !',
    _5_NOT_FOUND_REDIRECT: 'Origem da associação não encontrada, redirecionando para inicio em 3 segundos.',
    _6_ERROR_TRY_AGAIN: 'Ocorreu um erro ao carregar, Tente mais tarde! ',
    _9_SELECT_ITEM: 'Por favor, selecione um item !',
    _20_REQUEST_REALIZED: 'Solicitação realizada !',
    _22_SELECT_EXPORT: 'Selecione um item para exportar !',
    _23_SELECT_DEL: 'Selecione um item para remover !',
    _24_SELECT_EDIT: 'Selecione um item para editar !',
    _25_SELECT_VIEW: 'Selecione um item para visualizar !',
    _27_SPEAK_NOW: 'Você pode falar agora!',
    _28_SEARCH_SAVED: 'Consulta salva !',
    _31_ERROR_COMFIRM: 'Ocorreu um erro ao carregar, por favor conferirir o arquivo e tente novamente! ',
    _33_REQUEST_SAVED: 'Solicitação salva !',
  };

  private list = [];
  private last: { msg: string, dateInput: Date } = { msg: '', dateInput: null };

  dismiss() {
    this.snackBar.dismiss();
  }

  showToaster(msg: string, suppress_warning?: boolean) {

    if (!environment.production || suppress_warning) {
      console.log(msg);
    }

    if (msg && !suppress_warning) {

      this.list.push(
        {
          msg: msg,
          dateInput: new Date()
        }
      );

      if (this.list.length > 1) {

        interval(AlertService.duration).pipe(
          takeWhile(() => this.list.length > 0),
        ).subscribe(() => {
          if (this.last.dateInput !== this.list[0].dateInput) {
            this.last = this.list[0];
            this.snackBar.open(this.list[0].msg, null, { duration: AlertService.duration, });
          }
        });

        interval(AlertService.duration + 100).pipe(
          takeWhile(() => this.list.length > 0),
        ).subscribe(() => {
          if ((this.list[0].msg === this.last.msg) && (this.list[0].dateInput === this.last.dateInput)) {
            this.list.splice(0, 1);
          }
        });

      } else if (this.list.length === 1) {

        this.snackBar.open(this.list[0].msg, null, { duration: AlertService.duration, });

        this.last = this.list[0];

        interval(AlertService.duration).pipe(
          takeWhile(() => this.list.length > 0),
        ).subscribe(() => {
          if ((this.list[0].msg === this.last.msg) && (this.list[0].dateInput === this.last.dateInput)) {
            this.list.splice(0, 1);
          }
        });

      }

    }


  }

  clearAll() {
    this.list = [];
  }

}

