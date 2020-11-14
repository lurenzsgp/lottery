const Lottery = require("../index.js").Lottery;

it.todo('should add new team with 0 ticket');
it.todo('should assign ticket to the specified team');
it.todo('should add new team with 1 ticket');
it.todo('should add new team with any positive number of tickets');

it('should display an empty team list', () => {
        const lottery = new Lottery();

        expect(lottery.getTeamList()).toBe('')
});

it.todo('should display the team list with the team tickets');
it.todo('should dispaly the lottery result');
