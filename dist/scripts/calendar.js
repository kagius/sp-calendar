var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../../typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var CalendarController = (function () {
    function CalendarController() {
        var activeMonth = new Date();
        var startDate = this.determineFirstDayToDisplay(activeMonth);
        var lastDate = this.determineLastDayToDisplay(activeMonth);
        var entries = new Array();
        while (startDate.getTime() <= lastDate.getTime()) {
            entries.push(new CalendarEntry(new Date(startDate.getTime())));
            startDate.setDate(startDate.getDate() + 1);
        }
        this.model = new CalendarModel(activeMonth, this.chunk(entries, 7));
    }
    CalendarController.prototype.determineFirstDayToDisplay = function (date) {
        var dayOfMonth = date.getDate();
        var candidate = new Date();
        candidate.setHours(0);
        candidate.setMinutes(0);
        candidate.setSeconds(0);
        candidate.setMilliseconds(0);
        var firstDateLocated = false;
        while (!firstDateLocated) {
            var currentDate = candidate.getDate();
            if (candidate.getDay() !== 0) {
                candidate.setDate(currentDate - 1);
                continue;
            }
            if (currentDate === 1 || currentDate > dayOfMonth) {
                firstDateLocated = true;
            }
            else {
                candidate.setDate(currentDate - 1);
            }
        }
        return candidate;
    };
    CalendarController.prototype.determineLastDayToDisplay = function (date) {
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
        while (!lastDateLocated) {
            var currentDate = candidate.getDate();
            if (candidate.getDay() !== 6) {
                candidate.setDate(currentDate + 1);
                continue;
            }
            if (currentDate === lastDayOfMonth || currentDate < dayOfMonth) {
                lastDateLocated = true;
            }
            else {
                candidate.setDate(currentDate + 1);
            }
        }
        return candidate;
    };
    CalendarController.prototype.chunk = function (array, size) {
        var results = new Array();
        while (array.length) {
            results.push(array.splice(0, size));
        }
        return results;
    };
    CalendarController = __decorate([
        angular2_1.Component({
            selector: 'calendar',
            changeDetection: 'ON_PUSH'
        }),
        angular2_1.View({
            templateUrl: 'calendar.html',
            directives: [angular2_1.CORE_DIRECTIVES],
        })
    ], CalendarController);
    return CalendarController;
})();
var CalendarModel = (function () {
    function CalendarModel(activeMonth, entries) {
        this.activeMonth = activeMonth;
        this.rows = entries;
    }
    return CalendarModel;
})();
var CalendarEntry = (function () {
    function CalendarEntry(date) {
        this.date = date;
    }
    return CalendarEntry;
})();
angular2_1.bootstrap(CalendarController);
