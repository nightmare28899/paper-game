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
    {
      type: 'Lizard',
      image: '../../assets/images/icon-lizard.svg',
    },
    {
      type: 'Spock',
      image: '../../assets/images/icon-spock.svg',
    },
  ];

  header: boolean = true;
  type: string = '';
  img: string = '';
  theHousePickImg: string = '';
  theHousePick: string = '';
  score: number = 0;
  stateG: string = '';
  stateHP: string = '';
  statusGame: boolean = false;
  result: string = '';
  gameOver: boolean = false;
  changeMode: boolean = false;
  private numberMode: number = 0;

  ngOnInit(): void {
    if (localStorage.getItem('score') !== null) {
      this.score = Number(localStorage.getItem('score'));
    }
    this.api.currentChangeMode.subscribe((data) => {
      this.changeMode = data;
    });
  }

  public game(type: string) {
    let paper = 'Paper';
    let scissors = 'Scissors';
    let rock = 'Rock';
    let lizard = 'Lizard';
    let spock = 'Spock';

    this.changeMode ? (this.numberMode = 5) : (this.numberMode = 3);

    const arrRandom = Array.from({ length: 1 }, () =>
      Math.floor(Math.random() * this.numberMode)
    );

    this.header = false;
    this.type = type;
    const position = this.content.findIndex((item) => item.type === type);
    this.img = this.content[position].image;

    if (this.content[arrRandom[0]].type === type) {
      setTimeout(() => {
        this.stateG = 'Tie';
      }, 3000);
    } else if (
      (this.type === paper && this.content[arrRandom[0]].type === rock) ||
      (this.type === scissors && this.content[arrRandom[0]].type === paper) ||
      (this.type === rock && this.content[arrRandom[0]].type === scissors) ||
      (this.type === lizard && this.content[arrRandom[0]].type === spock) ||
      (this.type === spock && this.content[arrRandom[0]].type === scissors) ||
      (this.type === rock && this.content[arrRandom[0]].type === lizard) ||
      (this.type === lizard && this.content[arrRandom[0]].type === paper) ||
      (this.type === spock && this.content[arrRandom[0]].type === rock) ||
      (this.type === scissors && this.content[arrRandom[0]].type === lizard) ||
      (this.type === paper && this.content[arrRandom[0]].type === spock)
    ) {
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
}
