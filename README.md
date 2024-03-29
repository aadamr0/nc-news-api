# Northcoders News API

[Link to the API](https://nc-news-api-ffu7.onrender.com/api)<br>

### About the project:<br>

This project is a backend API of various endpoints, each endpoint serves different data from a PostgresSql database. Visit the above link to see all available endpoints and their functionality.<br>
<br>

### Cloning the repository<br>

To clone the repository, run:<br>
'git clone https://github.com/aadamr0/nc-news-api.git'
<br>
<br>

### Installing dependencies <br>

This project uses the package manager npm. To use npm, run the command: npm init -y.
<br> (note to teachers at nc - Is everything actually sorted with this ^?)
This project has the following dependencies. To install them, run the commands listed for each:<br>
├──dotenv@16.0.3 ; npm install dotenv --save<br>
├── express@4.18.2 ; npm i express<br>
├── fs@0.0.1-security ; npm install fs<br>
├── husky@9.0.11 ; npm install --save-dev husky npx husky init<br>
├── jest-extended@2.0.0 - npm install --save-dev jest<br>
├── jest-sorted@1.0.15 ; npm i jest-sorted<br>
├── jest@29.7.0 ; npm install --save-dev jest<br>
├── pg-format@1.0.4 ; npm install pg-format<br>
├── pg@8.8.0 ; npm install pg<br>
└── supertest@6.3.4 npm install supertest -D<br>
<br>

### Seeding the local database <br>

To set up and seed the local databases (note to teachers - not certain here?...):<br>
<br>

1. Make sure to [install Postgres v.2.7](https://postgresapp.com/downloads.html)
   <br>as well as [Node.js v.20](https://nodejs.org/en/download/)<br>
   <br>
2. Add to the project's parent folder, 'NC-NEWS-API', two .env files: <br>
   <br>

   1. '.env.test'<br>
      Inside, write 'PGDATABASE=nc_news_test' (excluding the quotation marks)<br>
      <br>
   2. '.env.development'<br>
      Inside, write 'PGDATABASE=nc_news' (excluding the quotation marks)<br>
      <br>

3. Last, run the command: 'npm run setup-dbs'. This should set up the databases locally. They should automatically seed when running tests.
   <br>
   <br>

### Testing<br>

To test the app, run the command: 'npm t app'. This should test the different endpoints for their expected uses and for correct error handling.