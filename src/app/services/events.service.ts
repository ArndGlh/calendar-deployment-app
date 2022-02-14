import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { Application, Environment, Author, EventPayload } from '../models/event.model';

const baseUrl = 'http://localhost:8080/api/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public createEvent(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  public findEventByApplicationAndEnvironment(idApplication: string, idEnvironment: string): Observable<EventPayload[]> {
    return this.http.get<EventPayload[]>(`${baseUrl}?application=${idApplication}&environment=${idEnvironment}`);
  }

  public getApplications():Observable<Application[]>{
    return this.http.get<Application[]>(`${baseUrl}/applications`);
  }

  public getEnvironments():Observable<Environment[]>{
    return this.http.get<Environment[]>(`${baseUrl}/environments`);

  }

  public getAuthors():Observable<Author[]>{
    return this.http.get<Author[]>(`${baseUrl}/authors`);
  }
}
