import {Directive, Output, EventEmitter, OnInit, NgZone, OnDestroy, AfterContentInit} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {ExecState, SliceState, SortState, StEvents, DisplayedItem} from './types';

function handleSortChange<T>(this: StTableDirective<T>, state: SortState) {
    this.sort.emit(state);
}

function handleDisplayChange<T>(this: StTableDirective<T>, items: DisplayedItem<T>[]) {
    this.items = items;
    this.display.emit(items);
}

function handleFilterChange<T>(this: StTableDirective<T>, state: any) {
    this.filter.emit(state);
}

function handleSliceChange<T>(this: StTableDirective<T>, state: SliceState) {
    this.slice.emit(state);
}

function handleExecChange<T>(this: StTableDirective<T>, state: ExecState) {
    this.exec.emit(state);
}


@Directive({
    selector: '[stTable]',
    exportAs: 'stTable'
})
export class StTableDirective<T> implements AfterContentInit, OnInit, OnDestroy {
    items: DisplayedItem<T>[] = [];
    private displayHandler: Function;
    private sortHandler: Function;
    private filterHandler: Function;
    private sliceHandler: Function;
    private execHandler: Function;

    @Output() display = new EventEmitter<DisplayedItem<T>[]>();
    @Output() sort = new EventEmitter<SortState>();
    @Output() filter = new EventEmitter();
    @Output() slice = new EventEmitter<SliceState>();
    @Output() exec = new EventEmitter<ExecState>();

    constructor(private table: SmartTable<T>) {
    }

    ngOnInit() {
        this.displayHandler = handleDisplayChange.bind(this);
        this.sortHandler = handleSortChange.bind(this);
        this.filterHandler = handleFilterChange.bind(this);
        this.sliceHandler = handleSliceChange.bind(this);
        this.execHandler = handleExecChange.bind(this);
        this.table.onDisplayChange(this.displayHandler);
        this.table.on(StEvents.TOGGLE_SORT, this.sortHandler);
        this.table.on(StEvents.FILTER_CHANGED, this.filterHandler);
        this.table.on(StEvents.PAGE_CHANGED, this.sliceHandler);
        this.table.on(StEvents.EXEC_CHANGED, this.execHandler);
    }

    ngAfterContentInit() {
        this.table.init();
    }

    ngOnDestroy() {
        this.table.off(StEvents.DISPLAY_CHANGED, this.displayHandler);
        this.table.off(StEvents.TOGGLE_SORT, this.sortHandler);
        this.table.off(StEvents.FILTER_CHANGED, this.filterHandler);
        this.table.off(StEvents.PAGE_CHANGED, this.sliceHandler);
        this.table.off(StEvents.EXEC_CHANGED, this.execHandler);
    }
}
