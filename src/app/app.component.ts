import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  subText = '';
  mainText = '';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  operatorSet = false;
  
  // new operators cab be added in this array 
  operlatorArray=['+','-','*','/'];


  pressKey(key: string) {
    if (this.operlatorArray.includes(key)) {
      if (this.mainText === '') {
        return;
      }
      if (this.operlatorArray.includes(this.mainText[this.mainText.length - 1])) {
        return;
      }
      this.operatorSet = true;
      this.operator = key;
    }
    let temp = this.calculationString + key;
    if (this.validateOperands(temp)) {
      this.calculationString += key;
      this.mainText += key;
      let count = 0;
      this.calculationString.split('').forEach(c => { if (this.operlatorArray.includes(c)) { count++; } });
      if (this.operatorSet && this.operlatorArray.includes(key) && count>1) {
        this.calculate(this.calculationString);
        this.calculationString=this.calculationString+key;
      }
    }
  }

  //check if operands are valid numbers 
  validateOperands(calStr: string): boolean {
    if (this.operatorSet) {
      let count = 0;
      let charList = calStr.split(this.operator)[1].split('');
      charList.forEach(c => { if (c == '.') { count++; } });
      if (count > 1) { return false; }
      else { return true; }

    }
    else {
      let count = 0;
      let charList = calStr.split('');
      charList.forEach(c => { if (c == '.') { count++; } });
      if (count > 1) { return false; }
      else { return true; }
    }
  }

  // calculates the string once new operator arrives 
  calculate(calStr: string) {
    let operands = calStr.split(this.operator);
    this.operand1 = parseFloat(operands[0]);
    this.operand2 = parseFloat(operands[1]);
    if ((this.operand1 || this.operand1==0) && (this.operand2 || this.operand2==0)) {
      this.calculationString = (this.operand1 + this.operand2).toString();
    }
  }

//on clicking equals shows final answer
  onClickEqual() {
    this.calculate(this.calculationString);
    this.subText = this.mainText;
    this.mainText = this.calculationString;
  }

  //reset all
  clearAll() {
    this.mainText = '';
    this.subText = '';
    this.operand1 = 0;
    this.operand2 = 0;
    this.calculationString = '';
    this.operatorSet = false;
  }
}
