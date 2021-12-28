const axios = require('axios');

// const subDomain = 'zccmarvinstevens';
// const zendeskBaseAPIURL = `https://${subDomain}.zendesk.com/api/v2/`;
// const username = 'mpate138@stevens.edu';
// const password = 'marvin1234';

const subDomain = 'prnv';
const zendeskBaseAPIURL = `https://${subDomain}.zendesk.com/api/v2/`;
const username = '2345.stkabirdio@gmail.com';
const password = 'Temp1234';

/**
 * Display error message
 * @param {string} functionName 
 * @param {*} error 
 */
function errorHandler(functionName, error) {
  switch (functionName) {
    case 'countTickets':
    case 'fetchAllTickets': {
      if (error.response.status === 404) {
        console.log('Zendesk API returned StatusCode:', error.response.status)
        console.log('No ticket found under this account');
      }
      if (error.response.status === 500) {
        console.log('Zendesk API returned StatusCode:', error.response.status)
        console.log('Internal Server Error. Please try again after some time.');
      }
      break;
    }
    case 'fetchTicketDetail': {
      if (error.response.status === 404) {
        console.log('Zendesk API returned StatusCode:', error.response.status)
        console.log('No ticket found for provided ID. Please verify the ID once.');
      }
      if (error.response.status === 500) {
        console.log('Zendesk API returned StatusCode:', error.response.status)
        console.log('Internal Server Error. Please try again after some time.');
      }
      break;
    }
    default: {
      console.log('No error handling for this function');
    }
      break;
  }
}

/**
 * Print the data in a tbaular format on the CLI
 * @param {array} data - provide an array of json as input 
 */
function printTabularData(data) {
  const printableData = data.map(item => {
    const { id, subject, status, type, created_at } = item;
    return {
      id,
      subject,
      status,
      type,
      created_at
    }
  })
  console.table(printableData);
}

/**
 * Generates a base64 encoded string from username and password
 * @returns string
 */
function basicAuthentication() {
  const authString = `${username}:${password}`;
  const bufferAuthString = Buffer.from(authString, 'utf-8');
  const base64Authentication = bufferAuthString.toString('base64');
  return base64Authentication;
}

/**
 * Fetch details for all tickets
 * @returns JSON
 */
async function fetchAllTickets() {
  try {
    const tickets = await axios({
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + basicAuthentication()
      },
      url: zendeskBaseAPIURL + 'tickets.json'
    })
    return { data: tickets };
  } catch (error) {
    console.log('error', error);
    errorHandler('fetchAllTickets', error);
    return { error }
  }
}

/**
* Counts the total number of tickets
* @returns JSON
*/
async function countTickets() {
  try {
    const tickets = await axios({
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + basicAuthentication()
      },
      url: zendeskBaseAPIURL + 'tickets/count.json'
    })
    return { data: tickets };

  } catch (error) {
    errorHandler('countTickets', error);
    return { error }
  }
}

/**
 * Fetch ticket details for provided ticketID
 * @param {int} ticketId 
 * @returns JSON
 */
async function fetchTicketDetail(ticketId) {
  try {
    const ticket = await axios({
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + basicAuthentication()
      },
      url: zendeskBaseAPIURL + `tickets/${ticketId}.json`
    })
    return { data: ticket };
  } catch (error) {
    errorHandler('fetchTicketDetail', error);
    return { error }
  }
}

/**
 * Fetch ticket details using pagination
 * @param {string} url 
 * @returns JSON
 */
async function fetchPaginationTickets(url) {
  try {
    var ret;
    const tickets = await axios({
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + basicAuthentication()
      },
      url: url
    })
    return { data: tickets };

  } catch (error) {
    errorHandler(fetchPaginationTickets, error);
    return { error }
  }
}

function getBaseURL(){
  return zendeskBaseAPIURL;
}

module.exports = { printTabularData, basicAuthentication, fetchTicketDetail, countTickets, fetchAllTickets, fetchPaginationTickets, errorHandler, getBaseURL };