import { SheetService } from '../../services/sheet.service';
import { SheetComponent } from './sheet.component';
import { SWSheetComponent } from './sw-sheet.component';

export * from '../../services/sheet.service';
export * from './sw-sheet.component';
export * from './sheet.component';

export const SHEET_ENTRY_COMPONENT = [
  SheetComponent
];

export const SHEET_COMPONENT = [
  SheetComponent,
  SWSheetComponent
];

export const SHEET_SERVICE = [
  SheetService
];
