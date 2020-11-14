const {Lottery} = require('./Lottery');
const inquirer = require('inquirer');

const lottery = new Lottery();

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const extractionQuestions = [{
	name: 'choice',
	message: 'What next?',
	type: 'list',
	choices: ['Pick', 'Recap', 'Remaining Teams', 'Exit'],
	loop: true,
}];

async function extractionMenu() {
	await inquirer.prompt(extractionQuestions).then(async (answers) => {
		switch(answers.choice) {
			case 'Pick':
				await sleep(1500);
				console.log(lottery.pick());
				break;
			case 'Recap':
				console.log(lottery.getExtractionOrder());
				break;
			case 'Remaining Teams':
				console.log(lottery.getTeamList());
				break;
			case 'Exit':
				console.log('Lottery result');
				console.log(lottery.getExtractionOrder());
				console.log('Remaining Team');
				console.log(lottery.getTeamList());
				process.exit();
		}
	});

	await extractionMenu();
}

const nameQuestions = [{
	type: 'input',
	name: 'teamName',
	message: "Which is the team name?",
}, {
	type: 'number',
	name: 'ticket',
	message: "How many ticket has the team?",
}];

const deleteQuestions = [{
	type: 'input',
	name: 'teamName',
	message: "Which is the team name?",
}];

const mainQuestions = [{
	type: 'list',
	message: 'What do you want to do?',
	name: 'mainChoice',
	choices: ['Add a new Team', 'See teams', 'Start extraction', 'Delete a Team', 'Exit'],
}];

async function mainMenu() {
	await inquirer.prompt(mainQuestions).then(async (answers) => {
		switch(answers.mainChoice) {
			case 'Add a new Team':
				await inquirer.prompt(nameQuestions).then((answers) => 
				lottery.addTeam(answers.teamName, answers.ticket));
				break;
			case 'See teams':
				console.log(lottery.getTeamList());
				break;
			case 'Start extraction':
				await extractionMenu();
				break;
			case 'Delete a Team':
				await inquirer.prompt(deleteQuestions).then((answers) => 
						lottery.removeTeam(answers.teamName));
				break;
			case 'Exit':
				process.exit();
			default:
				console.log('Unknown choice');
		}
	});
	
	mainMenu();
}

mainMenu();
