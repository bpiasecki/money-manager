import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'mm-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent {

  @Input() date: Date;

  @Output() onDateChange = new EventEmitter<Date>();


  onChange(date: MatDatepickerInputEvent<Date>) {
    this.onDateChange.emit(<Date>date.value);
  }

  setTodayDate() {
    this.onDateChange.emit(new Date())
  }

  setYesterdayDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.onDateChange.emit(date)
  }

}
