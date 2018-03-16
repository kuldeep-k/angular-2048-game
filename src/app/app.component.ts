import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  state = [];
  prevState = [];
  selectedIndex = [];
  colors = {};
  totalScore = 0;

  public constructor() {
    this.state = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];

    this.colors = {
      2: '#0000FF',
      4: '#00FF00',
      8: '#FF0000',
      16: '#00FFFF',
      32: '#FF00FF',
      64: '#FFFF00'
    }
  }


  public ngOnInit() {
    const cBlock = this.getFreeBlock(0);
    this.state[cBlock[0]][cBlock[1]] = 2;
  }

  getFreeBlock(iRow) {
    let freeblocks = [];
    for (let j = 0; j < 4; j++) {
      if (this.state[iRow][j] === '') {
        freeblocks.push(j);
      }
    }
    const rnd = Math.floor(Math.random() * 3);
    return [iRow, freeblocks[rnd]];
  // [iRow, j]
  }

  moveToBelow() {
    let nstate = [];
    this.updatePrevState();
    // let nstate = this.state.slice(0);
    for (let i = 0; i < 4; i++) {
      nstate[i] = [];
      for (let j = 0; j < 4; j++) {
        nstate[i][j] = this.state[i][j];
      }
    }

    for (let k = 0; k < 4; k++) {
      for (let i = 3; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
          if (nstate[i][j] !== '' && (i+1) < 4 ) {
            if (nstate[i+1][j] === '') {
              nstate[i+1][j] = nstate[i][j];
              nstate[i][j] = '';
            } else if(nstate[i+1][j] === nstate[i][j]) {
              nstate[i+1][j] += nstate[i][j];
              this.calculateScore(nstate[i+1][j]);
              nstate[i][j] = '';
            }
          }
        }
      }
    }

    this.state = nstate;
    this.addNewEntry(0);
  }

  moveToTop() {
    let nstate = [];
    this.updatePrevState();
    // let nstate = this.state.slice(0);
    for (let i = 0; i < 4; i++) {
      nstate[i] = [];
      for (let j = 0; j < 4; j++) {
        nstate[i][j] = this.state[i][j];
      }
    }

    for (let k = 0; k < 4; k++) {
      for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (nstate[i][j] !== '' && (i-1) < 4 ) {
            if (nstate[i-1][j] === '') {
              nstate[i-1][j] = nstate[i][j];
              nstate[i][j] = '';
            } else if(nstate[i-1][j] === nstate[i][j]) {
              nstate[i-1][j] += nstate[i][j];
              this.calculateScore(nstate[i-1][j]);
              nstate[i][j] = '';
            }
          }
        }
      }
    }

    this.state = nstate;
    this.addNewEntry(0);
  }

  moveToRight() {
    let nstate = [];
    this.updatePrevState();
    // let nstate = this.state.slice(0);
    for (let i = 0; i < 4; i++) {
      nstate[i] = [];
      for (let j = 0; j < 4; j++) {
        nstate[i][j] = this.state[i][j];
      }
    }

    for (let k = 0; k < 4; k++) {
      for (let j = 3; j >= 0; j--) {
        for (let i = 0; i < 4; i++) {
          if (nstate[i][j] !== '' && (j+1) < 4 ) {
            if (nstate[i][j+1] === '') {
              nstate[i][j+1] = nstate[i][j];
              nstate[i][j] = '';
            } else if(nstate[i][j+1] === nstate[i][j]) {
              nstate[i][j+1] += nstate[i][j];
              this.calculateScore(nstate[i][j+1]);
              nstate[i][j] = '';
            }
          }
        }
      }
    }

    this.state = nstate;
    this.addNewEntry(0);
  }

  moveToLeft() {
    let nstate = [];
    this.updatePrevState();
    // let nstate = this.state.slice(0);
    for (let i = 0; i < 4; i++) {
      nstate[i] = [];
      for (let j = 0; j < 4; j++) {
        nstate[i][j] = this.state[i][j];
      }
    }

    for (let k = 0; k < 4; k++) {
      for (let j = 1; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
          if (nstate[i][j] !== '' && (j-1) >= 0 ) {
            if (nstate[i][j-1] === '') {
              nstate[i][j-1] = nstate[i][j];
              nstate[i][j] = '';
            } else if(nstate[i][j-1] === nstate[i][j]) {
              nstate[i][j-1] += nstate[i][j];
              this.calculateScore(nstate[i][j-1]);
              nstate[i][j] = '';
            }
          }
        }
      }
    }

    this.state = nstate;
    this.addNewEntry(0);
  }

  updatePrevState() {
    let nstate = [];
    for (let i = 0; i < 4; i++) {
      nstate[i] = [];
      for (let j = 0; j < 4; j++) {
        nstate[i][j] = this.state[i][j];
      }
    }

    this.prevState.push(nstate);
  }

  addNewEntry(iRow) {
    const cBlock = this.getFreeBlock(iRow);
    this.state[cBlock[0]][cBlock[1]] = 2;
  }

  move(row, col) {
    this.selectedIndex = [row, col];
    for (let i = 1; i < 4; i++) {
      if (this.state[i][col] === '' && (i + 1) < 4 && this.state[i+1][col] !== '') {
        if(this.state[i+1][col] === 2) {
          this.state[i+1][col] += 2;
        } else {
          this.state[i][col] = 2;
        }
        break;
      }
    }
  }

  undo() {
    this.state = this.prevState.pop();
  }

  calculateScore(number) {
    this.totalScore += number;
  }
  
}
