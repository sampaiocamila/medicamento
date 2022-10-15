import { IParams } from 'ngx-particle';

import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: ['img { height: auto; }'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})

export class HomeComponent implements AfterViewInit {

  public particles_show = false;
  public particles_width = 100;
  public particles_height = 100;
  public particles_style2 = { 'width': '100%', 'height': '30px' };
  public particles_params2: IParams = <any>{
    particles: {
      interactivity: {},
      retina_detect: false,
      number: { value: 200 },
      color: { value: ['#eb4f36', '#f3e441', '#ec7c23', '#27b350'] },
      line_linked: {
        enable: true,
        distance: 200,
        color: '#4B0082',
        opacity: 0.5,
        width: 2,
        shadow: {
          enable: false,
          blur: 2,
          color: '#4B0082'
        }
      },
      move: {
        enable: true,
        speed: 0.5,
      },
      shape: { type: 'circle' },
    }
  };
  public services = [
    {
      'id': '0001',
      'label': 'Produtos',
      'content': './assets/produtos.png',
      'content_img': true,
      'icon_color': '',
      'description_service': 'Serviço de Gerenciamento de Produtos',
      'objective': '',
      'link': '/product',
      'name_breadcrumb': 'Produtos'
    },
    {
      'id': '0002',
      'label': 'Referências',
      'content': './assets/referencias.png',
      'content_img': true,
      'icon_color': '#8D7202',
      'description_service': 'Serviço de Gerenciamento de Referências',
      'objective': '',
      'link': '/referentials',
      'name_breadcrumb': 'Referências'
    },
    {
      'id': '0003',
      'label': 'Organizações',
      'content': './assets/organizacoes.png',
      'content_img': true,
      'icon_color': '#BF5808',
      'description_service': 'Serviço de Gerenciamento de Organizações',
      'objective': '',
      'link': '/organization',
      'name_breadcrumb': 'Organizações'
    },
    {
      'id': '0004',
      'label': 'Substâncias',
      'content': './assets/substancias.png',
      'content_img': true,
      'icon_color': '#337F4B',
      'description_service': 'Serviço de Gerenciamento de Substâncias',
      'objective': '',
      'link': '/substance',
      'name_breadcrumb': 'Substâncias'
    }
  ];

  constructor(private cd: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.particles_show = true;
    this.cd.detectChanges();
  }

}
