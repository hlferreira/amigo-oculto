import { messagesByAnswer } from "./messages.ts";

export class AmigoOcultolde {
    private answer: string = 'henrique';
    private guessesNumber: number = 0;
    private win;
    public currentGuess: string = ''
    public guessCode: string[][] = []
    public columns: number
    private messagesByAnswer = messagesByAnswer

    constructor(columns: number, rows: number = -1) {
        this.columns = columns
        this.resetTry()
    }

    checkGuess() {
        let tested: string[] = [];
        let treatedGuess = this.currentGuess.toLowerCase()
        console.log(this.currentGuess, this.win);
        for (let i = 0; i < treatedGuess.length; i++) {
            if (treatedGuess[i] === this.answer[i]) {
                if (this.win === undefined) {
                    this.win = true;
                }
                this.guessCode[this.guessesNumber][i] = 'X'
            } else if (this.answer.includes(treatedGuess[i]) && !tested.includes(treatedGuess[i])) {
                if (i < this.answer.length) this.win = false;
                this.guessCode[this.guessesNumber][i] = 'O'
            } else {
                if (i < this.answer.length) this.win = false;
                this.guessCode[this.guessesNumber][i] = '-'
            }
            tested[treatedGuess[i]]
        }
        return { guessCode: this.guessCode, win: this.win, message: this.getMessage(treatedGuess) }
    }

    private isLastElement(index: number) {
        return (index + 1) % this.columns === 0
    }

    private isFirstElement(index: number) {
        return index % this.columns === 0
    }

    public updateGuess(keyEvent: KeyboardEvent): boolean {
        const { target, key } = keyEvent;
        const index = parseInt((target as HTMLInputElement)?.id);
        const form = (target as HTMLInputElement)?.form

        if (!form) {
            return false
        }

        const s = this.sanitizeInput(keyEvent)
        console.log(s);

        if (!s) {
            return false
        }

        console.log(s, key, this.currentGuess, index);
        if (s != "Backspace") {
            this.currentGuess = this.currentGuess.substring(0, index) + s + this.currentGuess.substring(index + 1);
            if (!this.isLastElement(index)) {
                (form[index + 1] as HTMLInputElement).focus();
                return false
            }
            return true;
        }

        this.currentGuess = this.currentGuess.substring(0, index) + '_' + this.currentGuess.substring(index + 1);
        if (!this.isFirstElement(index)) {
            (form[index - 1] as HTMLInputElement).focus();
        }
        return false
    }

    public nextGuess(form: HTMLFormElement) {
        this.guessesNumber += 1;
        if (!this.win) {
            (form[this.columns * this.guessesNumber] as HTMLInputElement).focus()
            this.resetTry()
        }
    }

    private resetTry() {
        this.currentGuess = ''
        this.win = undefined
        this.guessCode.push(Array(this.columns).fill('-'))
    }

    private getMessage(answer: string) {
        const sanitizedAnswer = this.removeSpaces(answer);
        if (!Object.keys(this.messagesByAnswer).includes(sanitizedAnswer)) {
            return 'Não conheço essa pessoa'
        }
        return this.messagesByAnswer[sanitizedAnswer][Math.floor(Math.random() * this.messagesByAnswer[sanitizedAnswer].length)]
    }

    private removeSpaces(str: string) {
        console.log(str.length)
        return str.replace(/k/g, '')
    }

    private sanitizeInput(keyEvent: KeyboardEvent): string | undefined {
        const code = keyEvent.keyCode
        if ((code >= 65 && code <= 90) || code === 8)
            return (keyEvent.target as HTMLInputElement)?.value || keyEvent?.key;
        return undefined
    }
}