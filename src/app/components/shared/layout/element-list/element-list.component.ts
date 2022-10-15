import { Observable, of } from 'rxjs';
import {
    debounceTime, delay, distinctUntilChanged, takeWhile
} from 'rxjs/operators';

import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { ControlBuilder } from '../../models';
import { AlertService } from '../../services/alert.service';
import { LogService } from '../../services/log.service';
import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

/**
 * dont use if befor this component
 * send value afther onInit
 */
@Component({
    selector: 'element-list',
    templateUrl: 'element-list.component.html',
    styleUrls: ['./element-list.component.scss'],
    preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ElementListComponent implements AfterViewInit, OnDestroy {

    public isLive = true;
    private color = '#00000010';
    public displayName = {};
    public ACTIONS = 'actions';
    public _displayedColumns = [];
    public _columnsToDisplay = [this.ACTIONS];
    public _dataSource = new MatTableDataSource();
    public _selection = new SelectionModel<any>(true, []);
    public show_action_search = false;
    public show_action_edit = false;
    public show_action_remove = false;
    public show_action_radio = false;
    public show_action_name = 'Ações';
    public _consulta_label = 'Consulta';
    public _consulta_placeholder = '';
    public _settings;
    public icons = {};

    public displayedColumns = {
        pushAll: (datas: ControlBuilder[]) => {
            try {
                if (datas) {
                    this.displayName = {};
                    this._columnsToDisplay = [];
                    this._displayedColumns = [];

                    datas.sort(
                        (a, b) => {
                            if (!(a.favorite)) {
                                return -1;
                            }
                            if (!(b.favorite)) {
                                return 1;
                            }
                            if (a.favorite < b.favorite) {
                                return -1;
                            }
                            if (a.favorite > b.favorite) {
                                return 1;
                            }
                            return 0;
                        });
                    datas.forEach((data) => {
                        this._displayedColumns.push(data.name); // dont change
                        this.displayName[data.name] = data.displayed;
                        if (data.favorite != null) {
                            this._columnsToDisplay.push(data.name);
                        }
                    });
                    this._columnsToDisplay.push(this.ACTIONS);
                }
            } catch (error) {
                this.event({ error: error });
            }
        }
    };

    public dataSource = {
        getBy: (_filterValue, ...options: string[]) => {
            try {
                let result = [];
                if (this._dataSource.data && options && _filterValue) {
                    result = this._dataSource.data.filter((_value) => {
                        let ret = false;
                        options.forEach(option => {
                            const optionValue = _value[option];
                            ret = ret || optionValue === _filterValue;
                        });
                        return ret;
                    });
                }
                return result;
            } catch (error) {
                this.event({ error: error });
            }
        },
        selected: () => this._selection.selected,
        push: (data) => {
            try {
                this._dataSource.data.forEach((row: any) => {
                    if (this._dataSource.data && row.id === data.id) {
                        this.dataSource.pop(data);
                    }
                });
                this._dataSource.data.push(data);
                this._dataSource = new MatTableDataSource(this._dataSource.data);
                this._dataSource.paginator = this.paginator;
                this._dataSource.sort = this.sort;
                this.mattable.dataSource = this._dataSource;
                this.mattable.renderRows();
            } catch (error) {
                this.event({ error: error });
            }
        },
        pushAll: (list) => list.forEach((data) => {
            try {
                this._dataSource.data.forEach((row: any) => {
                    if (this._dataSource.data && row.id === data.id) {
                        this.dataSource.pop(data);
                    }
                });
                this._dataSource.data.push(data);
                this._dataSource = new MatTableDataSource(this._dataSource.data);
                this._dataSource.paginator = this.paginator;
                this._dataSource.sort = this.sort;
                this.mattable.dataSource = this._dataSource;
                this.mattable.renderRows();
            } catch (error) {
                this.event({ error: error });
            }
        }),
        push_cb: (_controls_builder?: ControlBuilder[]) => {
            try {
                const _l_data = this._dataSource.data;
                // tslint:disable-next-line:prefer-const
                let fb: FormGroup = new FormGroup({});
                _controls_builder.forEach(c => {
                    fb.addControl(c.name, new FormControl(c.value));
                });

                _l_data.forEach((row: any) => {
                    if (this._dataSource.data && row.id === fb.controls.id.value) {
                        this.dataSource.pop(row);
                    }
                });

                this._dataSource.data.push(fb.value);
                this._dataSource = new MatTableDataSource(this._dataSource.data);
                this._dataSource.paginator = this.paginator;
                this._dataSource.sort = this.sort;
                this.mattable.dataSource = this._dataSource;
                this.mattable.renderRows();
            } catch (error) {
                this.event({ error: error });
            }
        },
        pushAll_cb: (_controls_builders: ControlBuilder[][]) => {
            try {
                if (_controls_builders) {
                    _controls_builders.forEach(_controls_builder => {
                        const _l_data = this._dataSource.data;
                        // tslint:disable-next-line:prefer-const
                        let fb: FormGroup = new FormGroup({});
                        _controls_builder.forEach(c => {
                            fb.addControl(c.name, new FormControl(c.value));
                        });

                        _l_data.forEach((row: any) => {
                            if (this._dataSource.data && row.id === fb.controls.id.value) {
                                this.dataSource.pop(row);
                            }
                        });

                        this._dataSource.data.push(fb.value);
                        this._dataSource = new MatTableDataSource(this._dataSource.data);
                        this._dataSource.paginator = this.paginator;
                        this._dataSource.sort = this.sort;
                        this.mattable.dataSource = this._dataSource;
                        this.mattable.renderRows();
                    });
                }
            } catch (error) {
                this.event({ error: error });
            }
        },
        pop: (data) => {
            try {
                if (data && this._dataSource.data) {
                    let result = [];
                    result = this._dataSource.data.filter((_value: any) => {
                        let ret = false;
                        ret = ret || _value.id !== data.id;
                        return ret;
                    });
                    this._dataSource = new MatTableDataSource(result);
                    this._dataSource.paginator = this.paginator;
                    this._dataSource.sort = this.sort;
                    this.mattable.dataSource = this._dataSource;
                    this.mattable.renderRows();
                }
            } catch (error) {
                this.event({ error: error });
            }
        },
        reset: () => {
            try {
                // this.show_action_search = false;
                // this.show_action_edit = false;
                // this.show_action_remove = false;
                // this.show_action_radio = false;
                this._displayedColumns = [];
                this.displayName = {};
                this._columnsToDisplay = [this.ACTIONS];

                this._selection = new SelectionModel<any>(true, []);
                this._dataSource = new MatTableDataSource();
                this.mattable.dataSource = this._dataSource;
                this.mattable.renderRows();
            } catch (error) {
                this.event({ error: error });
            }
        }
    };


    constructor(public log: LogService, public alert: AlertService) { }

    @ViewChild(MatPaginator) public paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;
    @ViewChild(MatTable) public mattable: MatTable<any>;
    @Output() public action = new EventEmitter<ElementListEvents>();

    @Input() public set values(_values: Observable<any>) {
        // TODO remover @view´s e usar input
        if (_values) {
            _values.pipe(
            ).subscribe((_v: ElementListValues) => {
                try {

                    if (_v) {

                        if (_v.push) {
                            if (_v.push.length > 0) {
                                if (this._dataSource.data.length < 1) {
                                    this.displayedColumns.pushAll(_v.push[0]);
                                }

                                _v.push.forEach((_pu) => {
                                  const indexIconsRow = _pu.findIndex(v => v.name === 'icons');
                                  if(indexIconsRow >= 0){
                                    const iconsRow = _pu[indexIconsRow];
                                    const id = window.btoa(iconsRow.value);
                                    if(iconsRow && (!this.icons || !this.icons[id])){
                                      this.icons[id] = JSON.parse(iconsRow.value);
                                    }
                                    _pu[indexIconsRow].value = id;
                                  }
                                  this.dataSource.push_cb(_pu);
                                });
                            } else {
                                this.dataSource.reset();
                            }
                        }

                        if (_v.pop) {
                            if (_v.pop.length > 0) {
                                _v.pop.forEach((_p) => this.dataSource.pop(_p));
                            } else {
                                this.dataSource.reset();
                            }
                        }

                        if (_v.reset) {
                            this.dataSource.reset();
                            if (_v.reset !== true && _v.reset.length > 0) {
                                if (this._dataSource.data.length < 1) {
                                    this.displayedColumns.pushAll(_v.reset[0]);
                                }
                                _v.reset.forEach((_pu) => this.dataSource.push_cb(_pu));
                            }
                        }

                        if (_v.settings) {
                            this.settings = _v.settings;
                        }

                    }

                } catch (error) {
                    this.event({ error: error });
                }
            });
        }
    }

    @Input() public set settings(_settings: Observable<ElementListSettings>) {
        if (_settings) {
            _settings.pipe(
            ).subscribe(
                (s: ElementListSettings) => {
                    try {
                        if (s) {
                            this._settings = s;
                            if (this._settings.show_action) {
                                this.show_action_search = this._settings.show_action.search;
                                this.show_action_edit = this._settings.show_action.edit;
                                this.show_action_remove = this._settings.show_action.remove;
                                this.show_action_radio = this._settings.show_action.radio;
                                this.show_action_name = this._settings.show_action.name;
                                this._consulta_placeholder = this._settings.show_action.consulta_placeholder;
                                this._consulta_label = this._settings.show_action.consulta_label;
                            }
                        }
                    } catch (error) {
                        this.event({ error: error });
                    }
                }
            );
        }
    }

    /** Whether the number of selected elements matches the total number of rows. */
    public isAllSelected() {
        const numSelected = this._selection.selected.length;
        const numRows = this._dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    public masterToggle() {
        this.isAllSelected() ?
            this._selection.clear() :
            this._dataSource.data.forEach(row => this._selection.select(row));
    }

    // public isLoadingResults() {
    //     const _data_source: any = this.mattable ? this.mattable.dataSource : null;
    //     return _data_source && _data_source.data && _data_source.data.length < 1;

    // }

    public removeRow(row?) {
        const _rows = row ? row : this._selection.selected;
        if (_rows && this.show_action_remove) {
            _rows.forEach(r => this.dataSource.pop(r));
            this.event({ remove: _rows });
        } else {
            this.alert.showToaster(AlertService.MSG_LIST._23_SELECT_DEL);
        }
    }

    public editRow(row) {
        window.performance.mark('mark_editRow');
        if (row && this.show_action_edit) {
            this.event({ edit: row });
        } else {
            this.alert.showToaster(AlertService.MSG_LIST._24_SELECT_EDIT);
        }
    }

    public viewRow(row) {
        if (row && this.show_action_search) {
            this.event({ view: row });
        } else {
            this.alert.showToaster(AlertService.MSG_LIST._25_SELECT_VIEW);
        }
    }

    public event(event: ElementListEvents) {
        if (event && this.isLive) {
            this.action.emit(event);
        }
    }

    getAll() {
        if (this._dataSource) {
            this.event({ getAll: this._dataSource.data });
        }
    }

    changeRadioSelection(event) {

    }

    ngAfterViewInit(): void {
    }

    public ngOnDestroy(): void {
        this.isLive = false;
        this.alert.clearAll();
    }

    public applyFilter(_filterValue) {
        try {
            this._dataSource.filter = _filterValue.value.trim().toLowerCase();
            if (this._dataSource.paginator) {
                this._dataSource.paginator.firstPage();
            }
            if (this._dataSource.filteredData && this._dataSource.filteredData.length === 0) {
                of(this._dataSource.filter).pipe(
                    takeWhile(() => this.isLive),
                    delay(100),
                    debounceTime(200),
                    distinctUntilChanged(),
                ).subscribe(value => {
                    this.event({ filteredData: value });
                });
            }
        } catch (error) {
            this.event({ error: error });
        }
    }
}

export interface ElementListSettings {
    show_action: {
        search?: boolean;
        edit?: boolean;
        remove?: boolean;
        radio?: boolean;
        name?: string;
        consulta_placeholder?: string;
        consulta_label?: string;
    };
}

export interface ElementListValues {
    push?: ControlBuilder[][];
    pop?: { id?: string }[];
    reset?: any;
    settings?: Observable<ElementListSettings>;
}

export interface ElementListEvents {
    filteredData?: any;
    remove?: any;
    view?: any;
    edit?: any;
    getAll?: any;
    error?: any;
}
