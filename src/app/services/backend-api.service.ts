import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor() { }

  variableTest = new BehaviorSubject<Array<any>>([]);
  currentVariableTest = this.variableTest.asObservable();
  
  changeMode = new BehaviorSubject<boolean>(false);
  currentChangeMode = this.changeMode.asObservable();

  test() {
    let variable = '';
    /* this.variableTest.next('test'); */
    return this.currentVariableTest;
  }

  changeModeGame() {
    this.changeMode.next(true);
    return this.currentChangeMode;
  }
}
