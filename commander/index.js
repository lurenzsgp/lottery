const lodash = require('lodash');

class Commander {
	constructor() {
		this.teams = {};
		this.extractionOrder = [];
	}

	getExtractionOrder() {
		return this.extractionOrder.map((teamName, index) => `${index + 1}) ${teamName}`)
			.join('\n');
	}

	getTeamList() {
		const sortedTeamList = lodash.orderBy(this.teams, ['ticket', 'name'], ['desc', 'asc']);
		return sortedTeamList
			.map(team => {
				const label = team.ticket === 1 ? 'ticket' : 'tickets';

				return `${team.name} - ${team.ticket} ${label}`;
			})
			.join('\n');
	}

	addTeam(teamName, tickets = 0) {
		this.teams[teamName] = {
			name: teamName,
			ticket: tickets > 0 ? tickets : 0
		};
	}
	
	setTickets(teamName, tickets) {
		if(typeof tickets === 'undefined')
			throw new Error('Missing tickets');
		
		if(!this.teams.hasOwnProperty(teamName))
			throw new Error('Team is not registered');

		this.addTeam(teamName, tickets);
	}

	pick() {
		const urn = this.createUrn();
		const randomIndex = Math.floor(Math.random() * urn.length);

		const pickedTeamName = urn[randomIndex];
		delete this.teams[pickedTeamName];

		this.extractionOrder.push(pickedTeamName);

		return pickedTeamName;
	}
	
	createUrn() {
		const urn = [];

		for(let teamName in this.teams) {
			const team = this.teams[teamName];
			urn.push(...(new Array(team.ticket).fill(team.name)));
		}

		return urn;
	}
}

exports.Lottery = Commander
