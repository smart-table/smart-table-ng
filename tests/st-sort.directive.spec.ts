import {SmartTable} from '../src/smart-table.service';
import {StSortDirective} from '../src/st-sort.directive';
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {SortDirection} from '../src/commont-types';

interface User {
    name: string;
    age: number;
    email: string;
}

@Component({})
class StTableHostComponent {
    constructor() {

    }
}

describe('StSortDirective', () => {
    let stInstance: SmartTable<User>;
    let spy: any;

    const createComponent = (html = `<button stSort="name">Toggle name</button>`) => {
        const module = TestBed.configureTestingModule({
            declarations: [StSortDirective, StTableHostComponent],
            providers: [{
                provide: SmartTable, useValue: stInstance
            }]
        });
        TestBed.overrideComponent(StTableHostComponent, {
            set: {
                template: html
            }
        });
        const fixture = module.createComponent(StTableHostComponent);
        fixture.detectChanges();
        return fixture;
    };

    beforeEach(() => {
        stInstance = SmartTable.of([]);
        spy = spyOn(stInstance, 'sort').and.callThrough();
    });

    it('should toggle the sort direction', done => {
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('button');
        el.dispatchEvent(new MouseEvent('click'));

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                pointer: 'name',
                direction: 'asc'
            }]);
            expect(el.classList.contains('st-sort-asc')).toBe(true);
            expect(el.classList.contains('st-sort-desc')).toBe(false);
            done();
        }, 30);
    });

    it('should toggle the other sort direction', done => {
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('button');
        el.dispatchEvent(new MouseEvent('click'));

        setTimeout(() => {
            fixture.detectChanges();
            el.dispatchEvent(new MouseEvent('click'));
        }, 30);

        setTimeout(() => {
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(2);
            expect(spy.calls.mostRecent().args).toEqual([{
                pointer: 'name',
                direction: 'desc'
            }]);
            expect(el.classList.contains('st-sort-desc')).toBe(true);
            expect(el.classList.contains('st-sort-asc')).toBe(false);
            done();
        }, 70);
    });

    it('should update itself when sort state has been updated', done => {
        const fixture = createComponent();
        const el = fixture.nativeElement.querySelector('button');
        el.dispatchEvent(new MouseEvent('click'));

        setTimeout(() => {
            fixture.detectChanges();
            expect(el.classList.contains('st-sort-desc')).toBe(false);
            expect(el.classList.contains('st-sort-asc')).toBe(true);
            stInstance.sort({pointer: 'email', direction: SortDirection.ASC});
        }, 30);

        setTimeout(() => {
            fixture.detectChanges();
            expect(el.classList.contains('st-sort-desc')).toBe(false);
            expect(el.classList.contains('st-sort-asc')).toBe(false);
            done();
        }, 60);
    });
});
