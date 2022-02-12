import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public options: any;
  public calendarEl = document.getElementById('calendar');
  public locale: any;

  constructor() { }

  ngOnInit(): void {

    this.options = {
      initialDate : new Date(),
      initialView : 'timeGridWeek',
      dateClick: this.handleDateClick.bind(this),
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: false,
      selectable:false,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: false,
      slotMinTime: "06:00:00",
      slotMaxTime: "20:00:00",
      locale: 'fr',
      events: [
        { title: 'event 1', start: new Date(), end: new Date().setHours(18) }
      ],
    };
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }
}
