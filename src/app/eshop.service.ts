import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as data from './data.json';

@Injectable({
  providedIn: 'root'
})
export class EshopService {

  constructor() { }

  public getData(): Observable<any> {
    return of(data);
  }

}
