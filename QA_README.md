#### Install the framework:
1. Run `npm install` command
2. Run `npm install cypress` command

#### How to run the tests:
1. Check package.json
2. Run the command `npm run cy:open` to open the cypress interface where you can choose the browser and see all the tests
3. Run any script from `package.json` if you want to run all UI / API tests on headless mode using command `npm run cy:ui` or `npm run cy:api`
4. Tests are alse splitted by spec file, so in the scripts lists you can notice also commands like `cy:api:pet`, by running the command `npm run cy:api:pet` you will be able to run in headless mode only the pet api tests

#### How the tests are structured
* Technologies used: Cypress + pure typescript language
* POM model, under e2e folder we can find under `api` and `ui` folders the spec files 
* Under utils folder we can find the page selectors and some functions needed for tests
* Fixtures contains some enums needed
* Under support folder, in the *commands.ts* we can write custom global commands, like cy.login(user, password);