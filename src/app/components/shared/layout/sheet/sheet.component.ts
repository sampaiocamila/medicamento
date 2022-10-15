import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { SheetService } from '../../services/sheet.service';

@Component({
    selector: 'element-sheet',
    templateUrl: 'sheet.component.html',
    styleUrls: ['./sheet.component.scss'],
    preserveWhitespaces: false
})
export class SheetComponent implements OnInit, OnDestroy {

    public isLive = false;
    @Output() public action = new EventEmitter();

    constructor(private bottomSheetRef: MatBottomSheetRef<SheetComponent>, public sheetService: SheetService) { }

    openLink(event: MouseEvent): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    close() {
        this.bottomSheetRef.dismiss();
    }

    public ngOnInit() {
        this.isLive = true;
    }

    public ngOnDestroy(): void {
        this.isLive = false;
    }

}
