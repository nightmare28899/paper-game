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
    if (localStorage.getItem('score')) {
      this.score = Number(localStorage.getItem('score'));
    }
    this.api.currentChangeMode.subscribe((data) => {
      this.changeMode = data;
    });
  }

  public game(type: string) {
    const dictionary = {
      Paper: 'Paper',
      Scissors: 'Scissors',
      Rock: 'Rock',
      Lizard: 'Lizard',
      Spock: 'Spock',
    };

    this.numberMode = this.changeMode ? 5 : 3;

    const arrRandom = [Math.floor(Math.random() * this.numberMode)];

    this.header = false;
    this.type = type;
    const position = this.content.findIndex((item) => item.type === type);
    this.img = this.content[position].image;

    const currentPlayerType = this.content[arrRandom[0]].type;
    const playerType = this.type;

    const winConditions = {
      [dictionary.Paper]: [dictionary.Rock, dictionary.Spock],
      [dictionary.Scissors]: [dictionary.Paper, dictionary.Lizard],
      [dictionary.Rock]: [dictionary.Scissors, dictionary.Lizard],
      [dictionary.Lizard]: [dictionary.Spock, dictionary.Paper],
      [dictionary.Spock]: [dictionary.Scissors, dictionary.Rock],
    };

    setTimeout(() => {
      if (currentPlayerType === type) {
        this.stateG = 'Tie';
      } else if (winConditions[playerType].includes(currentPlayerType)) {
        this.stateG = 'You Win';
        this.score++;
        localStorage.setItem('score', JSON.stringify(this.score));
      } else {
        this.stateG = 'You Lose';
      }
    }, 3000);

    setTimeout(() => {
      const housePick = this.content[arrRandom[0]];
      this.theHousePick = housePick.type;
      this.theHousePickImg = housePick.image;
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
