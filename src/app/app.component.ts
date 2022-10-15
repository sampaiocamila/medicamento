import { IParams } from 'ngx-particle';

import {
  AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav } from '@angular/material/sidenav';
import { SwUpdate } from '@angular/service-worker';

import { HomeComponent } from './components/home/home.component';
import { ConfigService } from './components/shared';
import { SWSheetComponent } from './components/shared/layout/sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [` .shadow { 3px 0px 4px 0px #00000033;}`],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated
})

export class AppComponent implements AfterViewInit {

  private deferredPrompt;
  public isHome = true;

  public particles_show = false;
  public particles_width = 100;
  public particles_height = 100;
  public particles_style = { 'width': '100%', 'height': '50px', 'margin-top': '-17px' };
  public particles_params: IParams = <any>{
    particles: {
      interactivity: {},
      retina_detect: false,
      number: { value: 200 },
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
  public events: string[] = [];
  public opened: boolean;

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  public toggle() {
    if (this.configService._fixedInViewport) {
      this.configService._fixedInViewport = false;
    }
    this.sidenav.toggle();
  }

  constructor(
    public configService: ConfigService,
    private swUpdate: SwUpdate,
    private _sw_Sheet: MatBottomSheet
  ) {

  }

  public ngAfterViewInit(): void {

    try {

      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(event => {
          this._sw_Sheet.open(SWSheetComponent);
        });
      }

      window.addEventListener('beforeinstallprompt', event => {
        console.log(`beforeinstallprompt start: ${JSON.stringify(event)}`);
        if (event) {
          event.preventDefault();
          this.deferredPrompt = event;
          if (this.deferredPrompt) {

            this.deferredPrompt.userChoice.then(
              choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('user accepted A2HS prompt');
                } else {
                  console.log('user dismissed A2HS prompt');
                }
                this.deferredPrompt = null;
              },
              error => {
                console.log(`Instalar APP error: ${error}`);
              });
          }
        }
      });

    } catch (error) {
      console.log(`Beforeinstallprompt error: ${JSON.stringify(error)}`);
    }

    this.particles_show = true;

  }

  public onActivate(e) {
    if (e instanceof HomeComponent) {
      this.isHome = true;
    } else {
      this.isHome = false;
    }
    if (!this.configService._fixedInViewport) {
      this.sidenav.close();
    }
  }

  public onDeactivate(e) {
    // if (e instanceof HomeComponent) {
    this.isHome = false;
    // }
  }

}
