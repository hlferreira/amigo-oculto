export function keydown(keyboard: KeyboardEvent) {
    const key = keyboard.key
    if (key === 'backspace') {
        data.guesses[i] = guess.slice(0, -1);
        if (form?.badGuess) form.badGuess = false;
    } else if (guess.length < rowSize) {
        data.guesses[i] += key.toLowerCase();
    }
}