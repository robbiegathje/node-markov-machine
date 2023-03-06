const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
	let machine;

	beforeEach(() => {
		machine = new MarkovMachine('the cat in the hat\n');
	});

	test('constructor properly creates words list', () => {
		expect(machine.words).toEqual(['the', 'cat', 'in', 'the', 'hat']);
		expect(machine.words).not.toContain('');
	});

	test('.makeChains() properly makes markov chain', () => {
		let chain = [
			['the', ['cat', 'hat']],
			['cat', ['in']],
			['in', ['the']],
			['hat', [null]],
		];
		expect(machine.markovChain).toEqual(new Map(chain));
	});

	test('.makeText() generates approriate text', () => {
		let text = machine.makeText((numWords = 10));
		let words = text.split(' ');
		expect(text).toBeTruthy();
		expect(
			words.every((word) => {
				return machine.words.includes(word);
			})
		).toEqual(true);
		for (let i = 0; i < words.length - 1; i++) {
			let nextWord = words[i + 1];
			expect(machine.markovChain.get(words[i])).toContain(nextWord);
		}
		expect(words.length).toBeLessThanOrEqual(10);
	});
});
