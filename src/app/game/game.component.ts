import { Component, OnInit } from '@angular/core';
import { GameLogic } from '../game-logic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameLogic]
})
export class GameComponent implements OnInit {

  constructor(public game: GameLogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = (this.game.currentTurn === 1 ? "X" : "O") + "'s turn";
    const information = document.querySelector(".current-status");
    if (information?.innerHTML) {
      information.innerHTML = currentPlayer;
    }
  }

  async clickSubField(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      if (this.game.gameField[position] === 0){
      this.game.setField(position, this.game.currentTurn)
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color)
      
      await this.game.checkGameEndWinner().then( (end: boolean) => {
        if (this.game.gameStatus === 0 && end){
          const information = document.querySelector(".current-status");
          if (information?.innerHTML) {
            information.innerHTML = this.game.winner;
          }
        }
      });


      this.game.changePlayer();
      if (this.game.gameStatus === 1) {
        const currentPlayer = (this.game.currentTurn === 1 ? "X" : "O") + "'s turn";
        const information = document.querySelector(".current-status");
        if (information?.innerHTML) {
          information.innerHTML = currentPlayer;
        }
      }
    }
    }
  }
}