import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Config, NameLink } from '../models';

/**
 * Configurações .
 * `ConfigService` somente fornece uma maneira de acompanhar as configurações de todos os recursos.
 * Não oferencendo metodos que efetuem alterações e tambem não recebe valores para alterações.
 *
 * providedIn: "root" | "any" | "platform"
 * Injetor 'root' , que será o injetor no nível do aplicativo na maioria dos aplicativos.
 * Injetor 'platform' , que seria o injetor de plataforma singleton especial compartilhado por todos os aplicativos na página.
 * Injetor 'any' que seria o injetor que recebe a resolução.
 * (Observe que isso funciona apenas em injetores NgModule e não no injetor de elementos)
 *
 */
@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  private _getConfig = null;
  private _getSchema = null;
  private _getFinalItem = null;

  public isAuthenticated = true;
  public _nickName = 'Login';

  /**
   * _background and color header
   */
  public _background = '#4B0082';
  public _color = '#fff';

  /**
   * Tamanho superior _top;
   * Tamanho inferior _bottom;
   * Tamanho lateral : _left e _right
   */
  public _top = 50;
  public _right = 0;
  public _bottom = 0;
  public _left = 0;

  public _width_menu = 200;

  /**
   * Espaço superor _fixedTopGap
   * Espaço inferior _fixedBottomGap
   */
  public _fixedTopGap = 50;
  public _fixedBottomGap = 0;

  // box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);

  public _fixedInViewport = false;

  public get finalItem() {
    return this._getFinalItem;
  }

  public get breadcrumb(): NameLink[] {
    return this._breadcrumb;
  }

  public brasil = false;
  // fixar o menu lateral na pagina
  public fix = false;
  // tema da aplicação
  public theme;
  public _url;
  private _breadcrumb = [];

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  /**
   * <botao loadStyle('styles-dark.css') />
   * angular.json
   *  [
    "src/styles.scss",
              {
                "input": "src/styles-dark.scss",
                "bundleName": "styles-dark",
                "inject": false
              }
            ]
   */
  public loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.getElementById(
      'theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
    }
  }

  public loadCdnjs(cdn_link: string) {
    const head = this.document.getElementsByTagName('head')[0];
    const _id = window.btoa(cdn_link);
    const _cdnlink = this.document.getElementById(_id) as HTMLScriptElement;
    if (_cdnlink) {
      _cdnlink.src = cdn_link;
    } else {
      const _cdn = this.document.createElement('script');
      _cdn.id = _id;
      _cdn.src = cdn_link;
      head.appendChild(_cdn);
    }
  }

  // /**
  //  * `getConfig()` fornece as informações sobre as configurações.
  //  *
  //  * @return um `Observable` de `Config`.
  //  */
  // public getConfig(): Observable<Config> {
  //   if (this._getConfig) {
  //     return of<Config>(this._getConfig);
  //   }

  //   return this.http.get<Config>(environment.config).pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     map(_c => {
  //       this._getConfig = _c;
  //       return this._getConfig;
  //     })
  //   );

  // }

  public clearCache() {
    this._getConfig = null;
  }

  // public getSchema() {
  //   if (this._getSchema) {
  //     return of<Config>(this._getSchema);
  //   }
  //   return this.http.get(environment.schema);
  // }

  public setBreadcrumbByIndex(index: number, link: string, _name_breadcrumb: string) {
    this._breadcrumb[index] = { link: link, name: `/ ${_name_breadcrumb}` };
  }

  public setBreadcrumb(_router): void {

    if (!_router || _router.url === this._url) {
      return;
    } else {
      this._url = _router.url;
    }

    if (_router.url === '/home') {
      this._url = _router.url;
      this._breadcrumb = [];
      return;
    }

    if (_router.url.split('?')[1] === 'br=') {
      // this.setBarraBrasil();
    }

    const _routs =
      [
        {
          'id': '0007',
          'label': 'Bioloficos form',
          'content': 'help_outline',
          'content_img': false,
          'icon_color': '',
          'description_service': '',
          'objective': '',
          'link': '/bioform',
          'sub': null,
          'name_breadcrumb': 'Biologicos'
        }
      ];

    const _services: any[] = this._find(
      [{ 'id': '0000', 'link': '/home', 'name_breadcrumb': 'Início', 'sub': null }], _routs, _router.url
    );

    this._getFinalItem = _services[_services.length - 1];

    this._breadcrumb = this._setInfo(_services);

  }

  private _find(left_item: any[], items: any[], _url: string): any[] {
    if (items) {

      let _service_secund_level = null;
      const _service_firt_level = items.find(_s => {

        if (_s.sub && _url.startsWith(_s.link)) {
          _service_secund_level = _s;
        }

        if (!_service_secund_level && _url.startsWith(left_item[left_item.length - 1].link)) {
          if (_s.sub && _s.sub.find(_sb => _sb.link === _url.split('?')[0])) {
            _service_secund_level = _s;
          }
        }

        return _s.link === _url.split('?')[0];
      });

      if (_service_firt_level) {
        _service_firt_level.link = _url;
        left_item.push(_service_firt_level);
        return left_item;
      }

      if (_service_secund_level) {
        left_item.push(_service_secund_level);
        return this._find(left_item, _service_secund_level.sub, _url);
      }

      return left_item;
    }
  }

  private _setInfo(_services: any[]): NameLink[] {

    const _list: NameLink[] = [];

    if (_services) {

      _services.forEach((_o: { id: string, link: string, name_breadcrumb: string }, _index: number) => {
        if (_o.name_breadcrumb === '...') {
          const enc_id = _o.link.split('?id=')[1];
          const _link = _o.link;
          let _name_breadcrumb = _o.name_breadcrumb;

          if (enc_id) {

            try {

              const _decuri_id = decodeURIComponent(enc_id);
              const decoding_id = JSON.parse(window.atob(_decuri_id)).data;
              _name_breadcrumb = decoding_id.name;
              const old: { name: string, url: string } = decoding_id.old;

              if (old) {
                const _i: number = _index - 1;
                const _list_link = _list[_i].link;
                const _list_name = _list[_i].name;
                let old_url = old.url.split('#')[1];
                old_url = old_url ? old_url.split('?id=')[0] : old.url.split('?id=')[0];
                if (_list_name === `/ ...` && _list_link === old_url) {
                  const denc_id = decodeURIComponent(old.url.split('?id=')[1]);
                  _list[_i] = { link: `${_list_link}?id=${denc_id}`, name: `/ ${old.name}` };
                }
              }


            } catch (error) {
              console.log(error);
            }

          }
          _list.push({ link: _link, name: `/ ${_name_breadcrumb}` });

        } else {
          const _o_name_breadcrumb = _index < 1 ? _o.name_breadcrumb : `/ ${_o.name_breadcrumb}`;
          _list.push({ link: _o.link, name: _o_name_breadcrumb });
        }
      });

    }

    return _list;
  }

  // private setBarraBrasil() {
  //   this.scriptService
  //     .load('barra.brasil').pipe(
  //       catchError(e => this.scriptService.load('barra_brasil'))
  //     ).subscribe(data => {
  //       this.brasil = true;
  //     });
  // }

}



