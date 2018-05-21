import {Directive, Output, EventEmitter, OnInit, NgZone, OnDestroy, AfterContentInit} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {ExecState, SliceState, SortState, StEvents, DisplayedItem} from "./types";

@Directive({
    selector: '[stTable]',
    exportAs: 'stTable'
})
export class StTableDirective<T> implements AfterContentInit, OnInit, OnDestroy {
    items: DisplayedItem<T>[] = [];

    @Output() display = new EventEmitter<DisplayedItem<T>[]>();
    @Output() sort = new EventEmitter<SortState>();
    @Output() filter = new EventEmitter();
    @Output() slice = new EventEmitter<SliceState>();
    @Output() exec = new EventEmitter<ExecState>();

    handleSortChange(state: SortState) {
        this.sort.emit(state);
    }

    handleDisplayChange(items: DisplayedItem<T>[]) {
        console.log('HANDLE DISPLAY');
        this.items = items;
        this.display.emit(items);
    }

    handleFilterChange(state: any) {
        this.filter.emit(state);
    }

    handleSliceChange(state: SliceState) {
        this.slice.emit(state);
    }

    handleExecChange(state: ExecState) {
        this.exec.emit(state);
    }

    constructor(private table: SmartTable<T>, private zone: NgZone) {
    }

    ngOnInit() {
        this.table.onDisplayChange(this.handleDisplayChange);
        // this.table.on(StEvents.TOGGLE_SORT, this.handleSortChange);
        // this.table.on(StEvents.FILTER_CHANGED, this.handleFilterChange);
        // this.table.on(StEvents.PAGE_CHANGED, this.handleSliceChange);
        // this.table.on(StEvents.EXEC_CHANGED, this.handleExecChange);
    }

    ngAfterContentInit() {
        this.table.init();
    }

    ngOnDestroy() {
        this.table.off(StEvents.DISPLAY_CHANGED, this.handleDisplayChange);
        this.table.off(StEvents.TOGGLE_SORT, this.handleSortChange);
        this.table.off(StEvents.FILTER_CHANGED, this.handleFilterChange);
        this.table.off(StEvents.PAGE_CHANGED, this.handleSliceChange);
        this.table.off(StEvents.EXEC_CHANGED, this.handleExecChange);
    }
}
