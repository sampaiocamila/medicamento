import { timer } from 'rxjs';

import {
    AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
    HostListener, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'sidenav-menu',
  templateUrl: 'sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class SidenavHeaderComponent implements AfterViewChecked {

  public items_h =
    [
      {
        'label': 'Início',
        'content': 'home',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/home',
        'sub': null,
        'name_breadcrumb': 'Início'
      },
      {
        'id': '0001',
        'label': 'Nova Prescrição',
        'content': 'content_paste',
        'content_img': false,
        'icon_color': '',
        'description_service': 'photo_filter',
        'objective': '',
        'link': '/prescricao',
        'sub': null,
        'name_breadcrumb': 'Nova Prescrição'
      },
      {
        'id': '0007',
        'label': 'Dispensação',
        'content': 'all_inbox',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/dispensacao',
        'sub': null,
        'name_breadcrumb': 'Ajuda'
      },
      {
        'id': '0007',
        'label': 'Administração',
        'content': 'library_add_check',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/administracao',
        'sub': null,
        'name_breadcrumb': 'Ajuda'
      },
      {
        'id': '0007',
        'label': 'Notificação',
        'content': 'circle_notifications',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/notificacao',
        'sub': null,
        'name_breadcrumb': 'Ajuda'
      },
      {
        'id': '0007',
        'label': 'Intercambialidade',
        'content': 'sms_failed',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/intercambialidade',
        'sub': null,
        'name_breadcrumb': 'Ajuda'
      },
      {
        'id': '0007',
        'label': 'Rastreabilidade',
        'content': 'all_inbox',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/rastreabilidade',
        'sub': null,
        'name_breadcrumb': 'Ajuda'
      },
      {
        'id': '0007',
        'label': 'Cadastrar Medicamentos',
        'content': 'help_outline',
        'content_img': false,
        'icon_color': '',
        'description_service': '',
        'objective': '',
        'link': '/cadastromed',
        'sub': null,
        'name_breadcrumb': 'Ajuda'
      }
    ];

  @ViewChild('accordion', { static: true }) accordion: MatAccordion;

  @Output() public toggle = new EventEmitter();

  @HostListener('mouseleave') public onMouseLeave() {
    if (!this.configService._fixedInViewport) {
      this._close();
      this.cd.detectChanges();
    }
  }

  constructor(private cd: ChangeDetectorRef, public configService: ConfigService) { }

  public ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  public _close() {
    if (!this.configService._fixedInViewport) {
      this.toggle.emit(true);
    }
    this.closeAll();
  }

  public closeAll() {
    timer(300).subscribe(() => { this.accordion.closeAll(); });
  }

}
