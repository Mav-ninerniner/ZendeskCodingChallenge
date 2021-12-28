const fs = require('fs');
const userPrompt = require('prompt-sync')({ sigint: true });
const pageSize = 25;  //change
const { printTabularData, fetchTicketDetail, countTickets, fetchAllTickets, fetchPaginationTickets, getBaseURL } = require('./functions/index')

async function start() {
  let action;
  var rep = true;
  console.log('\t==============================');
  console.log('\t# Welcome to the Ticket Viewer System #');
  console.log('\t==============================');
  while (rep) {
    if (!action) {
      console.log('Please choose an API, available options are: \n 1. fetch-tickets \n 2. count-tickets \n 3. fetch-ticket-detail \n 4. fetch-pagination-tickets \n 5. Exit');
      action = userPrompt('Input: ');
    }
    switch (action) {
      case 'fetch-tickets':
      case '1': {
        const { error, data } = await fetchAllTickets();
        if (error) {
          action = '';
          break;
        }
        console.log('Choose from menu\n 1)Save in .json file \n 2)Display on console')
        const opt = userPrompt('Input:');
        switch (opt) {
          case '1': {
            const filePath = userPrompt('Enter path to write the tickets to: ');
            try {
              await fs.writeFileSync(filePath, JSON.stringify(data.data, null, 2));
            } catch (error) {
              throw new Error('Failed in writing to file' + error);
            }
            console.log(`Server response written successfully to ${filePath}`);
            break;
          }
          case '2': {
            printTabularData(data.data.tickets)
            break;
          }
          default: {
            throw new Error('Unidentified action error: ' + action);
          }
        }
        action = '';
        break;
      }
      case 'count-tickets':
      case '2': {
        const { error, data } = await countTickets();
        if (error) {
          action = '';
          break;
        }
        console.log('The total number of tickets on this account are:', data.data.count.value);
        action = '';
        break;
      }
      case 'fetch-ticket-detail':
      case '3': {
        const ticketId = userPrompt('Enter the ticket ID/number: ');
        const { error, data } = await fetchTicketDetail(ticketId);
        if (error) {
          break;
        }
        console.log('The ticket details are:\n');
        printTabularData([data.data.ticket]);
        action = '';
        break;
      }
      case 'fetch-pagination-tickets':
      case '4': {
        cont = true
        var url = getBaseURL() + `tickets.json?page[size]=${pageSize}`;
        while (cont) {
          cont = false
          const { error, data } = await fetchPaginationTickets(url);
          printTabularData(data.data.tickets)
          if (data.data.meta.has_more) {
            console.log('More tickets are available, want to fetch those ? \n 1. Y \n 2. N\n')
            const opt = userPrompt('Input:');
            switch (opt) {
              case '1':
              case 'Y':
              case 'y': {
                cont = true;
                url = data.data.links.next;
                break;
              }
              case '2':
              case 'N':
              case 'n': {
                break;
              }
              default: {
                console.log('Invalid choice, going back to main menu...');
              }
            }
          }
        }
        action = '';
        break;
      }
      case 'Exit':
      case '5': {
        rep = false;
        break;
      }

      default: {
        throw new Error('Unidentified action error: ' + action);
      }
    }
  }
  console.log('\n==============================');
  console.log('Thank you for using the CLI!');
  console.log('==============================');
}

start()