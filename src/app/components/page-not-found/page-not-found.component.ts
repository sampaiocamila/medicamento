import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation
} from '@angular/core';

@Component({
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})

export class PageNotFoundComponent implements AfterViewInit {

  constructor(private cd: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.cd.markForCheck();
  }

}
