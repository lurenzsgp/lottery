const lodash = require('lodash');

class Commander {
	constructor() {
		this.teams = {};
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
}

exports.Lottery = Commander
