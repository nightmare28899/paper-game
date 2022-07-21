import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import {
  fade,
  flyInOut,
  myInsertRemoveTrigger,
  shrinkOut,
  flyInOutR,
  myInsertRemoveTrigger2,
  childAnimation,
} from '../tools/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade,
    flyInOut,
    myInsertRemoveTrigger,
    shrinkOut,
    flyInOutR,
    myInsertRemoveTrigger2,
    childAnimation,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private api: BackendApiService) {}

  public data: Array<any> = [];
  public content: Array<any> = [
    {
      type: 'Paper',
      image: '../../assets/images/icon-paper.svg',
    },
    {
      type: 'Scissors',
      image: '../../assets/images/icon-scissors.svg',
    },
    {
      type: 'Rock',
      image: '../../assets/images/icon-rock.svg',
    },
  ];
  public header: boolean = true;
  public type: string = '';
  public img: string = '';
  public theHousePickImg: string = '';
  public theHousePick: string = '';
  public score: number = 0;
  public stateG: string = '';
  public stateHP: string = '';
  public statusGame: boolean = false;
  public result: string = '';
  public changeMode: boolean = false;
  public gameOver: boolean = false;

  ngOnInit(): void {
    this.api.currentVariableTest.subscribe((res) => {
      console.log(res);
    });
    this.data.push({
      name: 'test',
      value: 'test',
    });
    this.api.variableTest.next(this.data);

    if (localStorage.getItem('score') !== null) {
      this.score = Number(localStorage.getItem('score'));
    }
  }

  public game(type: string) {
    const arrRandom = Array.from({ length: 1 }, () =>
      Math.floor(Math.random() * 3)
    );
    this.header = false;
    /* console.log(arrRandom); */
    this.type = type;
    /* console.log('this type',this.type); */
    const position = this.content.findIndex((item) => item.type === type);
    this.img = this.content[position].image;
    if (this.content[arrRandom[0]].type === type) {
      setTimeout(() => {
        this.stateG = 'Tie';
      }, 3000);
    } else if (this.type === "Paper" && this.content[arrRandom[0]].type === 'Rock' || this.type === 'Scissors' && this.content[arrRandom[0]].type === 'Paper' || this.type === 'Rock' && this.content[arrRandom[0]].type === 'Scissors') {
      setTimeout(() => {
        this.stateG = 'You Win';
        this.score++;
        localStorage.setItem('score', JSON.stringify(this.score));
      }, 3000);
    } else {
      setTimeout(() => {
        this.stateG = 'You Lose';
      }, 3000);
    }

    setTimeout(() => {
      this.theHousePick = this.content[arrRandom[0]].type;
      this.theHousePickImg = this.content[arrRandom[0]].image;
      this.stateG;
    }, 3000);
    setTimeout(() => {
      this.statusGame = true;
    }, 4000);
    setTimeout(() => {
      this.gameOver = true;
    }, 6000);

  }

  public reset() {
    this.header = true;
    this.statusGame = false;
    this.gameOver = false;
    this.result = '';
    this.stateG = '';
    this.stateHP = '';
    this.theHousePick = '';
    this.theHousePickImg = '';
    this.type = '';
    this.img = '';
  }

  public changeModeFunction() {
    this.changeMode = !this.changeMode;
    this.api.changeMode.next(this.changeMode);
  }
}
