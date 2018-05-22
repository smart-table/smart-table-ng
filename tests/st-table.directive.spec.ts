import {SmartTable} from '../src/smart-table.service';
import {StTableDirective} from '../src/st-table.directive';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({
    template: `<ul stTable #list="stTable">
<p>test</p>
    <li *ngFor="let item of list.items">{{ item.value.name }}</li>
</ul>`
})
class StTableHostComponent {
    constructor() {

    }
}

interface User {
    name: string;
    age: number;
    email: string;
}

const fixtureData: User[] = [
    {name: 'Bob', age: 30, email: 'foo@bar.com'},
    {name: 'Albert', age: 40, email: 'woo@example.com'},
    {name: 'Raymond', age: 35, email: 'nooo@bexample.com'}
];

describe('StTable directive', () => {
    it('should have rendered the items', done => {
        const instance = SmartTable.of(fixtureData);
        const fixture = TestBed.configureTestingModule({
            declarations: [StTableHostComponent, StTableDirective],
            providers: [{
                provide: SmartTable, useValue: instance
            }]
        })
            .createComponent(StTableHostComponent);

        fixture.detectChanges();
        setTimeout(() => {
            fixture.detectChanges();
            const component = fixture.componentInstance;
            const el: HTMLElement = fixture.nativeElement;
            const items = el.querySelectorAll('li');
            expect(items.length).toBe(3);
            done();
        }, 30);
    });
});
