/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function generateFromFile(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log(`Error reading ${path}:\n	${err}`);
			process.exit(1);
		}
		let machine = new MarkovMachine(data);
		console.log(machine.makeText());
	});
}

async function generateFromWeb(url) {
	try {
		let response = await axios.get(url);
		let machine = new MarkovMachine(response.data);
		console.log(machine.makeText());
	} catch (error) {
		if (error instanceof axios.AxiosError) {
			console.log(`Error fetching ${url}:\n	${error}`);
			process.exit(1);
		}
	}
}

if (process.argv[2] === 'file') {
	generateFromFile(process.argv[3]);
} else if (process.argv[2] === 'url') {
	generateFromWeb(process.argv[3]);
}
