import {Directive, Input, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {search} from 'smart-table-core';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Subscription, fromEvent} from 'rxjs/index';

@Directive({
    selector: '[stSearch]',
    exportAs: 'stSearch'
})
export class StSearchDirective<T> implements OnInit, OnDestroy {
    private _directive: any;
    private _inputSubscription: Subscription;

    constructor(private table: SmartTable<T>, private _el: ElementRef) {
    }

    @Input('stSearch') scope: string | string[];

    @Input('stDebounceTime') delay = 300;

    @Input('stSearchFlags') flags = 'i';

    @Input('stSearchEscape') escape: boolean | string = false;

    search(value: string): void {
        return this._directive.search(value, {
            flags: this.flags,
            escape: this.escape === 'true' || this.escape === true
        });
    }

    ngOnInit() {
        const scope = Array.isArray(this.scope) ? this.scope :
            this.scope.split(',').map(p => p.trim());
        this._directive = search({scope, table: this.table});
        const {value} = this._directive.state();
        this._el.nativeElement.value = value || '';
        this._inputSubscription = fromEvent(this._el.nativeElement, 'input')
            .pipe(
                map(($event: KeyboardEvent) => ($event.target as HTMLInputElement).value),
                debounceTime(this.delay),
                distinctUntilChanged(),
            )
            .subscribe(v => this.search(v));
    }

    ngOnDestroy() {
        this._directive.off();
        this._inputSubscription.unsubscribe();
    }
}
