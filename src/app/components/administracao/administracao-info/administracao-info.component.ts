import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'administracao-info',
  templateUrl: 'administracao-info.component.html',
  styles: [''],
  preserveWhitespaces: false
})
export class AdministracaoInfoComponent implements OnInit, OnDestroy {

  public isLive = false;
  public enable = false;
  public _administracao;

  @Input() public set administracao(_administracao) {
    if (_administracao) {
      this.enable = _administracao.enable;
      this._administracao = _administracao;
    }
  }

  @Output() public action = new EventEmitter();

  constructor() { }

  ngOnDestroy(): void {
    this.isLive = false;
    this.enable = false;
    this._administracao = null;
  }

  ngOnInit(): void {
    this.isLive = true;
  }

}
