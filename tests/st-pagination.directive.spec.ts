import {SmartTable} from '../src/smart-table.service';
import {StPaginationDirective} from '../src/st-pagination.directive';
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {of} from '../src/factories';

interface User {
    name: string;
}

@Component({})
class StTableHostComponent {
    constructor() {

    }
}

interface BindingResult {
    page: number;
    size: number;
    length: number;
    lowerBoundIndex: number;
    higherBoundIndex: number;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
}

const fetchBindingValues: (el: HTMLElement) => BindingResult = el => {
    const spans = el.querySelectorAll('span');
    const buttons = el.querySelectorAll('button');
    return {
        page: +(spans[0].textContent.trim()),
        size: +(spans[1].textContent.trim()),
        length: +(spans[2].textContent.trim()),
        lowerBoundIndex: +(spans[3].textContent.trim()),
        higherBoundIndex: +(spans[4].textContent.trim()),
        isPreviousDisabled: buttons[0].disabled,
        isNextDisabled: buttons[1].disabled,
    };
};

describe('StPaginationDirective', () => {
    let stInstance: SmartTable<User>;
    let spy: any;

    const createComponent = (html: string) => {
        const module = TestBed.configureTestingModule({
            declarations: [StPaginationDirective, StTableHostComponent],
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
        stInstance = of<User>([{name: 'Laurent'}, {name: 'Blandine'}, {name: 'Charlie'}], {
            sort: {},
            search: {},
            filter: {},
            slice: {page: 1, size: 1}
        });
        spy = spyOn(stInstance, 'slice').and.callThrough();
    });

    it('should set binding', done => {
        const fixture = createComponent(`
       <div stPagination #pager="stPagination">
       <span>{{ pager.page }}</span>
       <span>{{ pager.size }}</span>
       <span>{{ pager.length }}</span>
       <span>{{pager.lowerBoundIndex}}</span>
       <span>{{pager.higherBoundIndex}}</span>
       <button [disabled]="!pager.isPreviousPageEnabled()">previous</button>
       <button [disabled]="!pager.isNextPageEnabled()">next</button>
       </div>
       `);

        stInstance.init();

        setTimeout(() => {
            fixture.detectChanges();
            expect(fetchBindingValues(fixture.nativeElement)).toEqual({
                page: 1,
                size: 1,
                length: 3,
                lowerBoundIndex: 0,
                higherBoundIndex: 0,
                isPreviousDisabled: true,
                isNextDisabled: false,
            });
            stInstance.slice({page: 2, size: 1});
        }, 30);

        setTimeout(() => {
            fixture.detectChanges();
            expect(fetchBindingValues(fixture.nativeElement)).toEqual({
                page: 2,
                size: 1,
                length: 3,
                lowerBoundIndex: 1,
                higherBoundIndex: 1,
                isPreviousDisabled: false,
                isNextDisabled: false,
            });
            stInstance.slice({page: 2, size: 2});
        }, 60);

        setTimeout(() => {
            fixture.detectChanges();
            expect(fetchBindingValues(fixture.nativeElement)).toEqual({
                page: 2,
                size: 2,
                length: 3,
                lowerBoundIndex: 2,
                higherBoundIndex: 2,
                isPreviousDisabled: false,
                isNextDisabled: true,
            });
            done();
        }, 90);
    });

    it('should delegate selectPage call to service', done => {
        const fixture = createComponent(`<div stPagination #pager="stPagination"><button (click)="pager.selectPage(3)"></button></div>`);
        setTimeout(() => {
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                page: 3,
                size: 1
            }]);
            done();
        }, 30);
    });

    it('should delegate selectNextPage call to service', done => {
        const fixture = createComponent(`<div stPagination #pager="stPagination"><button (click)="pager.selectNextPage()"></button></div>`);
        setTimeout(() => {
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1);
            expect(spy.calls.mostRecent().args).toEqual([{
                page: 2,
                size: 1
            }]);
            done();
        }, 30);
    });

    it('should delegate selectPreviousPage call to service', done => {
        const fixture = createComponent(`<div stPagination #pager="stPagination">
<button (click)="pager.selectPreviousPage()"></button>
</div>`);
        stInstance.slice({page: 3, size: 1});
        setTimeout(() => {
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(2); // call within the setup
            expect(spy.calls.mostRecent().args).toEqual([{
                page: 2,
                size: 1
            }]);
            done();
        }, 60);
    });

    it('should delegate changePageSize call to service', done => {
        const fixture = createComponent(`<div stPagination #pager="stPagination">
<button (click)="pager.changePageSize(10)"></button>
</div>`);
        setTimeout(() => {
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();
            expect(spy.calls.count()).toBe(1); // call within the setup
            expect(spy.calls.mostRecent().args).toEqual([{
                page: 1,
                size: 10
            }]);
            done();
        }, 30);
    });
});
