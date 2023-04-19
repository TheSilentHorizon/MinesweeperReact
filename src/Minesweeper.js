import {Component} from "react";
import MinesweepSquare from "./MinesweepSquare";

/**
 *
 * sge@hörmann-info.com
 *
 * **/
export default class Minesweeper extends Component{

    size = 30; //Fixed size for the field.
    amount_mines = 20; // Amount of mines to dodge.
    squares = [];

    constructor(props) {
        super(props);
        this.state = this.generateBoard()
        for (let i = 0; i <= this.size; i++) {
            this.squares.push(new Array(this.size).fill(0));
        }
    }

    /**
     * Generates the values on the board which then get rendered accordingly.
     *
     * Mine = 10
     * Values = 1 - 4
     */
    generateBoard(){
        let board = []
        let isH = []
        /* generates 2d array with only 0.*/
        for (let i = 0; i <= this.size; i++) {
            board.push(new Array(this.size).fill(0));
           isH.push(new Array(this.size).fill(true));
        }

        for (let i = 0; i < this.amount_mines; i++) {
            let xCoord = Math.floor(Math.random() * this.size);
            let yCoord = Math.floor(Math.random() * this.size);
            /** Generate until 20 bombs have been seeded **/
            while(board[xCoord][yCoord] === -1){
                xCoord = Math.floor(Math.random() * this.size);
                yCoord = Math.floor(Math.random() * this.size);
            }
            board[xCoord][yCoord] = -1;
        }
        return {
            boardLogic: board,
            isHiddenMap: isH
        }
    }

    /**
     * Gets called when a cell is being clicked.
     * @param x - x coord
     * @param y - y coord
     */
    async onCellClick(x,y,copyIsHidden,copyLogic){
        if(!this.state.isHiddenMap[x][y])
            return;
        if(copyIsHidden == null)
        copyIsHidden = this.state.isHiddenMap.map(function(arr) {
            return arr.slice();
        });
        copyIsHidden[x][y] = false;
        let bombsNearby = 0;
        for (let i = -1; i <=1 ; i++) {
            for (let j = -1; j <=1; j++) {
                if(!(i === 0 && j === 0)){
                    if(x+i >= 0 && y+j >= 0 && x+i < this.size && y+j < this.size) {
                        if (this.state.boardLogic[x + i][y + j] === -1)
                            bombsNearby++;
                    }
                }
            }
        }
        if(bombsNearby !== 0){
            if(copyLogic == null) {
                copyLogic = this.state.boardLogic.map(function (arr) {
                    return arr.slice();
                });
            }
                copyLogic[x][y] = bombsNearby;
                this.setState({boardLogic: copyLogic, isHiddenMap: copyIsHidden})

        }
        else{
            let isEnd = true;
            /* Click all elements around you. */
            for (let i = -1; i <=1 ; i++) {
                for (let j = -1; j <=1; j++) {
                    if(!(i === 0 && j === 0)){
                      if(x+i >= 0 && y+j >= 0 && x+i < this.size && y+j < this.size) {
                          if(this.squares[x+i][y+j] != null && copyIsHidden[x+i][y+j]) {
                              copyIsHidden[x + i][y + j] = false;
                              this.onCellClick(x+i,y+j,copyLogic,copyIsHidden)
                              isEnd = false;
                          }
                      }
                    }
                }
            }
            if(isEnd)
            this.setState({isHiddenMap:copyIsHidden})
        }
    }

    getMinesweeperSqaure(xCoord,yCoord){
        return(<MinesweepSquare ref={(ref) => this.squares[xCoord][yCoord]= ref} xCoord={xCoord}
                                yCoord={yCoord}
                                onClick={(l,h) => this.onCellClick(xCoord,yCoord,l,h)}
                                value={this.state.boardLogic[xCoord][yCoord]}
                                isHidden={this.state.isHiddenMap[xCoord][yCoord]}/>)
    }

    render(){
        if(this.state.boardLogic.length === 0)
            return (
                <div>
                    <p>Bitte warten</p>
                </div>
            )
        return(
            <div className={"minesweeper-row"}>
                {[...Array(this.size)].map((element,xCoord) => (
                    <div  key={xCoord}>
                        {[...Array(this.size)].map((element,yCoord) => (
                          this.getMinesweeperSqaure(xCoord,yCoord)
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}
