import { timer } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import {
    AfterViewChecked, Component, EventEmitter, HostListener, Inject, Output, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'toolbar-header',
  templateUrl: 'toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.scss'],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarHeaderComponent implements AfterViewChecked {

  public _resizeBreadcrumb = [];
  private length_b: number;
  private old_breadcrumb: string;
  private porcentagem = 0;

  @Output() public toggle = new EventEmitter();

  constructor(
    private router: Router,
    public configService: ConfigService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener('mouseleave') public onMouseLeave() {
    this._resizeBreadcrumb[this.length_b - 1] = 'auto';
    this._resizeBreadcrumb[this.length_b - 2] = 'auto';
    this.old_breadcrumb = '';
  }

  @HostListener('window:resize', ['$event']) public onResize(event) {
    this._resizeBreadcrumb[this.length_b - 1] = 'auto';
    this._resizeBreadcrumb[this.length_b - 2] = 'auto';
    this.old_breadcrumb = '';
  }

  public ngAfterViewChecked(): void {
    this.fcresizeBreadcrumb();
  }

  public _toggle() {
    this.toggle.emit(true);
  }

  public fcresizeBreadcrumb() {

    if (!document.getElementById('breadcrumb') ||
      document.getElementById('breadcrumb').offsetHeight < 35) {
      this.porcentagem = 0;
      return;
    }

    if ((JSON.stringify(this.configService.breadcrumb) === this.old_breadcrumb) || this.porcentagem >= 60) {
      this.porcentagem = 0;
      return;
    }

    if (document.getElementById('breadcrumb').offsetHeight > 35) {

      this.porcentagem += 10;
      this.length_b = this.configService.breadcrumb.length;
      // this.old_breadcrumb = JSON.stringify(this.configService.breadcrumb);
      // const _breadcrumbWidth = Math.round(document.getElementById('breadcrumb').offsetWidth);
      // const ideal = ((83 * _breadcrumbWidth) / 620);
      this._resizeBreadcrumb = [];

      let length_slice = 0;
      this.configService.breadcrumb.forEach(b => {
        length_slice += b.name.length;
        this._resizeBreadcrumb.push('auto');
      });

      // if (this.configService.breadcrumb.length < 3) {
      //   return;
      // }

      // const px = (_breadcrumbWidth < 620 ? 6 : (_breadcrumbWidth < 800 ? 7 : 8));
      // const frac = ((length_slice - ideal) * px);

      if (!(document.getElementById(`${this.length_b - 1}b`) && document.getElementById(`${this.length_b - 2}b`))) {
        return;
      }

      const wu = Math.round(document.getElementById(`${this.length_b - 1}b`).offsetWidth);
      const wp = Math.round(document.getElementById(`${this.length_b - 2}b`).offsetWidth);

      const _wu = (Math.round((wu / 100) * this.porcentagem) - wu) * -1;
      const _wp = (Math.round((wp / 100) * this.porcentagem) - wp) * -1;
      if (_wu > 46) {
        this._resizeBreadcrumb[this.length_b - 1] = `${_wu}px`;
      }
      if (_wp > 46) {
        this._resizeBreadcrumb[this.length_b - 2] = `${(Math.round((wp / 100) * this.porcentagem) - wp) * -1}px`;
      }
      timer(100).subscribe(() => this.old_breadcrumb = '');

    }

  }

  public logout() {
  }

  public click(_url) {
    this._resizeBreadcrumb[this.length_b - 1] = 'auto';
    this._resizeBreadcrumb[this.length_b - 2] = 'auto';
    this.old_breadcrumb = '';

    if (this.router.url !== _url) {
      this.router.navigate(
        [_url.split('?')[0]],
        { queryParams: { id: _url.split('?id=')[1] }, skipLocationChange: false }
      );
    }
  }

}
