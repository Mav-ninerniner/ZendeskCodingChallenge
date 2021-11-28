const assert = require("assert");
const { printTabularData, basicAuthentication, fetchTicketDetail, countTickets, fetchAllTickets, fetchPaginationTickets, errorHandler } = require('../src/functions/index')

console.log('Beginning unit test API');
describe('Fetch ticket detail API', async () => {
    /**
     * Test fetchTicketDetail
     */
    it('Fetch ticket details', async () => {
        const response = await fetchTicketDetail(5);
        assert.equal(response.data.data.ticket.id, 5, 'Success!')
    })
})

describe('Count Tickets API', async () => {
    /**
     * Test countTickets
     */
    it('Count tickets', async () => {
        const response = await countTickets();
        assert.equal(response.data.data.count.value, 101, 'Success!')
    })
})

describe('Fetch All Tickets API', async () => {
    /**
     * Test fetchAllTickets
     */
    it('Fetch all ticket details', async () => {
        const response = await fetchAllTickets();
        assert.equal(response.data.data.tickets[0].id, 1, 'Success!')
    })
})
