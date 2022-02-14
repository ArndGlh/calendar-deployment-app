import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Application, Author, Environment, EventPayload } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/events.service';
import { DialogAddEventComponent } from './dialog-add-event/dialog-add-event.component';
import { DialogChooseEnvComponent } from './dialog-choose-env/dialog-choose-env.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public options: any;
  public calendarEl = document.getElementById('calendar');
  public locale: any;

  public applications!: Application[];
  public environments!: Environment[];
  public authors!: Author[];

  public events!: EventPayload[];
  public envSelect: string = "Aucun environnement sélectionné";

  constructor(public dialog: MatDialog,
    private eventService: EventService) { }

  ngOnInit(): void {

    this.retrieveContext();
    this.options = {
      initialDate : new Date(),
      initialView : 'timeGridWeek',
      dateClick: this.handleDateClick.bind(this),
      headerToolbar: {
          left: '',
          center: '',
          right: ''
      },
      editable: false,
      selectable:false,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: false,
      slotMinTime: "06:00:00",
      slotMaxTime: "20:00:00",
      locale: 'fr',
      events: this.events
    };
  }

  private retrieveContext(){
    this.eventService.getApplications().subscribe(res => {
      console.log(res);
      this.applications = res;
    });
    this.eventService.getEnvironments().subscribe(res => {
      this.environments = res;
    });
    this.eventService.getAuthors().subscribe(res => {
      this.authors = res;
    });

  }

  public handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  public ajouterEvent(): void{
    const dialogRef = this.dialog.open(DialogAddEventComponent, {
      width: '400px',
      data: {
        applications: this.applications,
        environments: this.environments,
        authors: this.authors
      }
    });

    dialogRef.afterClosed().subscribe((resultModale: EventPayload) => {
      if (resultModale) {
        console.log(resultModale);
        this.eventService.createEvent(resultModale).subscribe(resUpdate => {
          if(resUpdate){
            this.findEvents(resultModale.application, resultModale.environment);
          }
        })
      }
    });
  }

  public selectEnv(){
    const dialogRef = this.dialog.open(DialogChooseEnvComponent, {
      width: '400px',
      data: {
        applications: this.applications,
        environments: this.environments
      }
    });

    dialogRef.afterClosed().subscribe((resultModale: EventPayload) => {
      if (resultModale) {
        console.log(resultModale);
        this.findEvents(resultModale.application, resultModale.environment);
      }
    });
  }

  public findEvents(idApp: string, idEnv: string){
    if(this.applications && this.environments){
      let app = this.applications.find((el:Application) => el.idApplication === idApp);
      let env = this.environments.find((el:Environment) => el.idEnvironment === idEnv);

      if(app && env){
        this.envSelect = 'Environnement sélectionné : ' + app.application + ' ' + env.environment;
      } else {
        this.envSelect = 'Erreur dans la récupération de l\'environnement';
      }
    }
    this.eventService.findEventByApplicationAndEnvironment(idApp, idEnv).subscribe((res: EventPayload[]) => {
      this.events = res;



    });
  }
}
