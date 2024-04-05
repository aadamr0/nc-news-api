# Northcoders News API

[Link to the hosted API](https://nc-news-api-ffu7.onrender.com/api)<br>
Please note - the hosting service is a little slow, it might take a moment to load<br>

### About the project:<br>

This project is a backend API of various endpoints, each endpoint serves different data from a PostgresSql database. Visit the above link to see all available endpoints and their functionality<br>
<br>

### Cloning the repository<br>

To clone the repository, run:<br>
'git clone https://github.com/aadamr0/nc-news-api.git'
<br>

### Installing dependencies <br>

This project uses the package manager npm. To install all dependencies, run `npm install` <br>
This project has the following dependencies<br>
├── cors@2.8.5 <br>
├── dotenv@16.0.3 <br>
├── express@4.18.2 <br>
├── fs@0.0.1-security <br>
├── husky@9.0.11 <br>
├── init@0.1.2 <br>
├── jest-extended@2.0.0 <br>
├── jest-sorted@1.0.15 <br>
├── jest@29.7.0 <br>
├── npx@10.2.2 <br>
├── pg-format@1.0.4 <br>
├── pg@8.8.0 <br>
└── supertest@6.3.4 <br>
<br>

### Seeding the local database <br>

To set up and seed the local databases:<br>
<br>

1. Make sure to [install Postgres v.2.7](https://postgresapp.com/downloads.html)
   <br>as well as [Node.js v.20](https://nodejs.org/en/download/)<br>
   <br>
2. Add to the project's parent folder, 'NC-NEWS-API', two .env files: <br>
   <br>

   1. .env.test<br>
      Inside, write `PGDATABASE=nc_news_test`<br>
      <br>
   2. .env.development<br>
      Inside, write `PGDATABASE=nc_news`<br>
      <br>

3. Last, run the command: 'npm run setup-dbs'. This should set up the databases locally. They should automatically seed when running tests
   <br>

### Testing<br>

To test the app, run the command: 'npm t app'. This should test the different endpoints for their expected uses and for correct error handling