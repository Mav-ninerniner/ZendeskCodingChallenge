### Zendesk Ticket Viewer 

The CLI based ticket viewer system connects to Zendesk API where a user can view total tickets and fetch ticket details. 

**Built With:**\
- NodeJS

**Install the dependencies:**\
axios\
prompt-sync\ 
mocha

**Instructions:**\
RUN ```npm install``` to install all packages from package.json\
RUN ```node ./src/main.js``` to run the program

**Testing:**\
RUN the following command to perform unit test
```npm run test```

**NOTE:** *In Windows 11, for powershell modified the given curl command to this and ran for sample tickets:*
*curl.exe https://zccmarvinstevens.zendesk.com/api/v2/imports/tickets/create_many.json -v -u mpate138@stevens.edu:marvin1234 -X POST -d `@tickets.json -H "Content-Type: application/json"*

For any further queries, raise an issue here or contact at mpate138@stevens.edu
