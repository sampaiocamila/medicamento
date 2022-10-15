import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'responsavel',
  templateUrl: 'responsavel.component.html',
  styles: [''],
  preserveWhitespaces: false
})
export class ResponsavelComponent implements OnInit, OnDestroy {

  public isLive = false;
  public enable = true;
  public _responsavel = {
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

  @Input() public set responsavel(responsavel) {
    if (responsavel) {
      this._responsavel = responsavel;
    }
  }

  constructor() {
  }

  ngOnDestroy(): void {
    this.isLive = false;
  }

  ngOnInit(): void {
    this.isLive = true;
  }

  /**
   * Methods
   */

  /**
   * Loads
   */

}
