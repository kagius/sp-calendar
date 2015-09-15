/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

@Component({
	selector: 'calendar',
	changeDetection: 'ON_PUSH'
})

@View({
	templateUrl: 'calendar.html',
	directives: [CORE_DIRECTIVES],
})

class CalendarController {

	model: CalendarModel;

	determineFirstDayToDisplay(date:Date) : Date {
		var dayOfMonth = date.getDate();

		var candidate = new Date();
		candidate.setHours(0);
		candidate.setMinutes(0);
		candidate.setSeconds(0);
		candidate.setMilliseconds(0);

		var firstDateLocated = false;

		while(!firstDateLocated) {
			var currentDate = candidate.getDate();
			if (candidate.getDay() !== 0) {
				candidate.setDate(currentDate -1);
				continue;
			}

			if (currentDate === 1 || currentDate > dayOfMonth) {
				firstDateLocated = true;
			} else {
				candidate.setDate(currentDate -1);
			}
		}

		return candidate;
	}

	determineLastDayToDisplay(date:Date) : Date {
		var dayOfMonth = date.getDate();
		var monthNumber = date.getMonth();

		var lastDateOfMonth = new Date();
		lastDateOfMonth.setMonth(monthNumber + 1);
		lastDateOfMonth.setDate(0);

		var lastDayOfMonth = lastDateOfMonth.getDate();

		var candidate = new Date();
		candidate.setHours(0);
		candidate.setMinutes(0);
		candidate.setSeconds(0);
		candidate.setMilliseconds(0);

		var lastDateLocated = false;

		while(!lastDateLocated) {
			var currentDate = candidate.getDate();

			if (candidate.getDay() !== 6) {
				candidate.setDate(currentDate +1);
				continue;
			}

			if (currentDate === lastDayOfMonth || currentDate < dayOfMonth) {
				lastDateLocated = true;
			} else {
				candidate.setDate(currentDate +1);
			}
		}

		return candidate;
	}

	chunk(array:Array<CalendarEntry>, size:number):Array<Array<CalendarEntry>> {
		var results = new Array<Array<CalendarEntry>>();

		while (array.length) {
			results.push(array.splice(0, size));
		}

		return results;
	}

	constructor() {
		var activeMonth = new Date();

		var startDate = this.determineFirstDayToDisplay(activeMonth);
		var lastDate = this.determineLastDayToDisplay(activeMonth);

		var entries = new Array<CalendarEntry>();

		while (startDate.getTime() <= lastDate.getTime()) {
			entries.push(new CalendarEntry(new Date(startDate.getTime())));
			startDate.setDate(startDate.getDate() +1);
		}

		this.model = new CalendarModel(activeMonth, this.chunk(entries, 7));
	}
}

class CalendarModel {
	activeMonth: Date;
	rows: Array<Array<CalendarEntry>>;

	constructor(activeMonth: Date, entries: Array<Array<CalendarEntry>>) {
		this.activeMonth = activeMonth;
		this.rows = entries;
	}
}

class CalendarEntry {
	date: Date;
	constructor(date: Date) {
		this.date = date;
	}
}

bootstrap(CalendarController);
