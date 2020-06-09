# Risk Management Tool

The Risk Management Tool is designed as an aid in the process of risk management. Main functionalities of the application include the ability to keep a register of identified risks for multiple projects. 
Each of register entries - 'risks' - can be described by the user with it's qualitative and quantitative properties, making the process of risk eavaluation easier and providing a valuable insight for planning risk response. Managing risk responses is also one of the tool's functionalities, allowing user to keep a risk response plans for each of risk register entries. 

### Configuration

To run the application run the following commands:
```bash
#seting up the database
cd docker/
./build_image.sh
./run_database.sh

cd ../
dotnet run --project ./backend/RiskManagementAPI/RiskManagementAPI.csproj localhost 5432

cd frontend/riskManagementTool
npm install
npm start
```
Then the application is accessible on http://localhost:4200.
### Testing
To test the backend server and it's integration with the database you should have the database accessible on localhost:5432. Then run the following commands: 
```
cd ./backend
dotnet test
```

### MVP
A **minimum viable product** version of the tool should have following basic functionalities:
- create and delete a project
- create, delete and assign risks to project risk registers
- show and modify quantitative and qualitative properties of risks
- sort risk register according to selected quantitative property
- viewing projects and risks register items assigned to them in the web application

### Technology stack
On the backend side, the project uses PostgreSQL database and .Net Core RESTful API. Frontend of the application is implemened using Angular. 
For CI/CD project uses CircleCI.
The release version of application is supposed to use API server and database virtualized in Docker container connected in single docker-compose network with a container for frontend server (nginx with reverse proxy for API-client communication).

### Authors
 - Piotr Hełminiak
 - Jakub Jasiński
 - Sebastian Maciejewski
 - Jan Techner
