import {SmartTable} from '../src/smart-table.service';
import {StTableDirective} from '../src/st-table.directive';
import {Component} from '@angular/core';
import {TestBed, tick, fakeAsync, tick} from '@angular/core/testing';

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

fdescribe('StTable directive', () => {
    it('should have rendered the items', fakeAsync(() => {
        const instance = SmartTable.of(fixtureData);
        const fixture = TestBed.configureTestingModule({
            declarations: [StTableHostComponent, StTableDirective],
            providers: [{
                provide: SmartTable, useValue: instance
            }]
        })
            .createComponent(StTableHostComponent);

        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        tick(100);
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
        const el: HTMLElement = fixture.nativeElement;
        const itemsElement = el.querySelectorAll('li');
        expect(itemsElement.length).toEqual(3);
    }));
});
