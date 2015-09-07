/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

@Component({
	selector: 'calendar',
	changeDetection: 'ON_PUSH'
})

@View({
	templateUrl: 'calendar.html',
	directives: [NgFor],
})

class CalendarController {
	
	activeMonth: Date;
	rows: Array<Array<number>>;

	constructor() {		
		this.rows = [
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, 31, 1, 2, 3, 4]
		];

		this.activeMonth = new Date(2015, 08, 1, 0, 0, 0, 0);
	}
}

bootstrap(CalendarController);