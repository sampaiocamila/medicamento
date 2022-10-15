import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styles: ['img { height: auto; }'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements AfterViewInit {

  public img_show = false;
  public brasil = false;

  //   <button aria-label="VOLTAR AO TOPO" mat-raised-button #button class="mat-raised mat-primary button-position-footer"
  // 	(click)="onToTop()" matTooltip="VOLTAR AO TOPO" matTooltipPosition="above">
  // 	<mat-icon style="color: #fff;">arrow_upward</mat-icon>
  // </button>

  // @ViewChild('button', { static: false }) public button: MatButton;
  @Input() public set theme(themePalette) {
    // if (themePalette && this.button) {
    //   this.button.color = themePalette;
    // }
  }

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  public ngAfterViewInit(): void {
    // if (this.configService) {
    //   this.brasil = this.configService.brasil;
    // }
    this.cd.markForCheck();
    this.img_show = true;
  }

  // onToTop() {
  //   this.win.scrollTop = 0;
  // }

}
