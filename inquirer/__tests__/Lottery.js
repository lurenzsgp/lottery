const Lottery = require("../Lottery.js").Lottery;
const _ = require('lodash');

it('should display an empty team list', () => {
        const lottery = new Lottery();

        expect(lottery.getTeamList()).toBe('')
});

it('should add new team with 0 ticket', () => {
	const lottery = new Lottery();
	
	lottery.addTeam('Llamas');

	expect(lottery.getTeamList()).toBe('Llamas - 0 tickets');
});

it('should assign tickets to the specified team', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas');
	lottery.setTickets('Llamas', 7);

	expect(lottery.getTeamList()).toBe('Llamas - 7 tickets');
});

it('should throw error if setTickets is called without the ticket number', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas');

	expect(() => lottery.setTickets('Llamas')).toThrow();
});

it('should throw error if setTickets is called with an unregistered team', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas');

	expect(() => lottery.setTickets('Giraffe', 1)).toThrow();
});

it('should add new team with 1 ticket', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas', 1);

	expect(lottery.getTeamList()).toBe('Llamas - 1 ticket');
});

it.each([
	['Llamas', -1, 'Llamas - 0 tickets'],
	['Llamas', 0, 'Llamas - 0 tickets'],
	['Llamas', 1, 'Llamas - 1 ticket'],
	['Llamas', 3, 'Llamas - 3 tickets'],
	['Giraffe', 10, 'Giraffe - 10 tickets'],
	['Giraffe', 20, 'Giraffe - 20 tickets']
])('should add new team with any positive number of tickets', (teamName, tickets, result) => {
	const lottery = new Lottery();

	lottery.addTeam(teamName, tickets);

	expect(lottery.getTeamList()).toBe(result);
});


it('should display the team list with the team tickets ordered by tickets', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas', 7);
	lottery.addTeam('Newpy', 10);
	lottery.addTeam('Saragozza', 20);
	lottery.addTeam('Lakers', 1);

	expect(lottery.getTeamList()).toBe('Saragozza - 20 tickets\nNewpy - 10 tickets\nLlamas - 7 tickets\nLakers - 1 ticket');
});

it('should extract a random team following the team probabilities', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas', 1);

	expect(lottery.pick()).toBe('Llamas');
});

it('should not extract two time the same team', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas', 1);
	lottery.pick();

	expect(lottery.pick()).not.toBe('Llamas');
});

it('should generate an urn with the exact number of tickets associated to the team', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas', 3);
	lottery.addTeam('Giraffe', 20);
	const urn = lottery.createUrn();
	const count = _.countBy(urn);

	expect(count['Llamas']).toBe(3);
	expect(count['Giraffe']).toBe(20);
});

it('should return the actual extraction order', () => {
	const lottery = new Lottery();

	lottery.addTeam('Llamas', 3);
	lottery.addTeam('Giraffe', 20);
	lottery.pick();
	lottery.pick();
	const extractionResult = lottery.getExtractionOrder();

	expect(extractionResult).toMatch(/Llamas/);
	expect(extractionResult).toMatch(/Giraffe/);
});

it('should delete team by name', () => {
	const lottery = new Lottery();
	
	lottery.addTeam('Llamas');
	lottery.addTeam('Giraffe');
	lottery.removeTeam('Llamas');

	expect(lottery.getTeamList()).toMatch(/Giraffe/);
	expect(lottery.getTeamList()).not.toMatch(/Llamas/);
})
