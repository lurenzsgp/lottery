const Lottery = require("../index.js").Lottery;

it('should display an empty team list', () => {
        const lottery = new Lottery();

        expect(lottery.getTeamList()).toBe('')
});

it('should add new team with 0 ticket', () => {
	const lottery = new Lottery();
	
	lottery.addTeam('Llamas');

	expect(lottery.getTeamList()).toBe('Llamas - 0 ticket');
});

it('should assign ticket to the specified team', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas');
	lottery.setTickets('Llamas', 7);

	expect(lottery.getTeamList()).toBe('Llamas - 7 tickets');
});

it.todo('should add new team with 1 ticket');
it.todo('should add new team with any positive number of tickets');


it.todo('should display the team list with the team tickets');
