

class Commander {
	constructor() {
		this.teams = {};
	}

	getTeamList() {
		return Object.keys(this.teams)
			.map(teamName => {
				const label = this.teams[teamName] ? 'tickets' : 'ticket';

				return `${teamName} - ${this.teams[teamName]} ${label}`;
			})
			.join('\n');
	}

	addTeam(teamName) {
		this.teams[teamName] = 0;
	}
	
	setTickets(teamName, tickets) {
		this.teams[teamName] = tickets;
	}
}

exports.Lottery = Commander
