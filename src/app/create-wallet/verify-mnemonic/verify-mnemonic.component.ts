import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-verify-mnemonic',
  templateUrl: './verify-mnemonic.component.html',
  styleUrls: ['./verify-mnemonic.component.css']
})
export class VerifyMnemonicComponent implements OnInit {

  @Input() mnemonic: string[];
  @Output() mnemonic_verification_event = new EventEmitter<null>();

  randomisedMnemonic: string[];
  re_entered_mnemonic: string[] = [];
  mnemonic_error: string = '';

  constructor() { }

  ngOnInit(): void {
    this.randomisedMnemonic = [...this.mnemonic];

    this.randomiseMnemonic();
  }


  //method checks that the words entered by the user are in the right order as the original mnemonic
  verifyMnemonic() {
    if (this.re_entered_mnemonic.length === this.mnemonic.length) {
      return this.mnemonic.every((word, index) => {
        return word === this.re_entered_mnemonic[index];
      });
    }

    return false;
  }


  randomiseMnemonic() {
    let currentIndex = this.randomisedMnemonic.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.randomisedMnemonic[currentIndex], this.randomisedMnemonic[randomIndex]] = [
        this.randomisedMnemonic[randomIndex], this.randomisedMnemonic[currentIndex]];
    }
  }


  selectWord(word: string, index: number) {
    this.re_entered_mnemonic.push(word);
    this.randomisedMnemonic.splice(index, 1);
  }


  undoSelection(word: string, index: number) {
    this.re_entered_mnemonic.splice(index, 1);
    this.randomisedMnemonic.push(word);
  }


  verifyWallet() {
    if(this.verifyMnemonic()) {
      this.mnemonic_verification_event.emit();
    } else {
      this.mnemonic_error = 'The mnemonic phrase you entered is not in the right order, check the previous step and note the mnemonic phrase again';

      setTimeout( () => {
        this.mnemonic_error = '';
      }, 4000);
    }
  }

}
