/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((word) => word !== '');
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let markovChain = new Map();
		for (let i = 0; i < this.words.length; i++) {
			if (markovChain.has(this.words[i]) === false) {
				markovChain.set(this.words[i], [
					this.words[i + 1] ? this.words[i + 1] : null,
				]);
			} else {
				let wordChain = markovChain.get(this.words[i]);
				wordChain.push(this.words[i + 1] ? this.words[i + 1] : null);
				markovChain.set(this.words[i], wordChain);
			}
		}
		this.markovChain = markovChain;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let possibleStartWordsIterator = this.markovChain.keys();
		let startWordIndex = Math.ceil(Math.random() * this.markovChain.size);
		for (let i = 1; i < startWordIndex; i++) {
			possibleStartWordsIterator.next();
		}
		let startWord = possibleStartWordsIterator.next().value;
		let outputWords = [startWord];
		for (let i = 0; i < numWords - 1; i++) {
			let nextWordOptions = this.markovChain.get(outputWords[i]);
			let randomIndex = Math.floor(
				Math.random() * nextWordOptions.length
			);
			let nextWord = nextWordOptions[randomIndex];
			if (nextWord === null) {
				return outputWords.join(' ');
			} else {
				outputWords.push(nextWord);
			}
		}
		return outputWords.join(' ');
	}
}
