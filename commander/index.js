

class Commander {
	constructor() {
		this.teams = [];
	}

	getTeamList() {
		if(!this.teams.length)
			return '';

		return this.teams[0] + ' - 0 ticket';
	}

	addTeam(teamName) {
		this.teams.push(teamName);
	}
}

exports.Lottery = Commander
