import { Status } from "./game-status"
export class GameLogic {

    gameField: Array<number> = [];

    currentTurn: number;

    winner: string = 'Draw game, no winner';

    gameStatus: Status;

    public constructor() {
        this.currentTurn = 1;
        this.gameStatus = Status.STOP;
        this.gameField = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];
    }
    gameStart(): void {
        this.gameField = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];
        this.currentTurn = this.randomPlayerStart();
        this.winner = 'Draw game, no winner';
        this.gameStatus = Status.START;

    }

    randomPlayerStart(): number {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }
    //make an array that breaks up play field into all 8 possible win situations
    async winSituations(arr: Array<number>): Promise<Array<Array<number>>> {
        const winArray = [
            [arr[0], arr[1], arr[2]],
            [arr[3], arr[4], arr[5]],
            [arr[6], arr[7], arr[8]],
            [arr[0], arr[3], arr[6]],
            [arr[1], arr[4], arr[7]],
            [arr[8], arr[5], arr[2]],
            [arr[0], arr[4], arr[8]],
            [arr[2], arr[4], arr[6]],
        ]
        return winArray
    }
    setField(position: number, value: number): void {
        this.gameField[position] = value;
    }
    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }
    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }
    arrayEquals(aArr: Array<any>, bArr: Array<any>): boolean {
        return Array.isArray(aArr) && Array.isArray(bArr) && aArr.length === bArr.length && aArr.every((value, index) => value === bArr[index])
    }
    async checkGameEndWinner(): Promise<boolean> {

        let isWinner = false;
        const currentArray = (this.currentTurn === 1) ? [1, 1, 1] : [2, 2, 2];
        const checkArray = await this.winSituations(this.gameField)
        checkArray.forEach((checkField) => {
            if (this.arrayEquals(checkField, currentArray)) {
                isWinner = true;
            }
        })


        if (isWinner) {
            this.winner = (this.currentTurn === 1 ? "X's win":"O's win")
            this.gameEnd();
            return true;
        }
        if (!this.gameField.includes(0)) {
            this.winner = "Draw game, no winner"
            this.gameEnd();
            return true;
        }
        else {
            return false;
        }
    }

    
    gameEnd(): void {
        this.gameStatus = Status.STOP
    }

}




