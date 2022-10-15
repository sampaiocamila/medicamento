import { IParams } from 'ngx-particle';

import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation
} from '@angular/core';

@Component({
  templateUrl: 'authentication.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})

export class AuthenticationComponent implements OnInit, AfterViewInit {


  constructor(private cd: ChangeDetectorRef) { }

  public particles_width = 100;
  public particles_height = 100;
  public particles_style = { 'width': '100%', 'height': '50%' };
  public particles_params: IParams = <any>{
    particles: {
      interactivity: {},
      retina_detect: false,
      number: { value: 160 },
      color: { value: ['#eb4f36', '#f3e441', '#ec7c23', '#27b350'] },
      line_linked: {
        enable: true,
        distance: 100,
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

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.cd.markForCheck();
  }
}
