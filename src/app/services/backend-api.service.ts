import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor() {}

  changeMode = new BehaviorSubject<boolean>(false);
  currentChangeMode = this.changeMode.asObservable();
}
