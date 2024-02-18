# Backend General

This is a General Backend App for Usefull in Various Apps Like Authentication, Blog, CRUD etc.


## Authors

- [@Nirav Khant](https://www.github.com/niravkhant)


## Deployment

First of All Install this project

```bash
  npm i
```

Then Run Project using

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

`PORT`

`MONGODB_URI`

`CORS_ORIGIN`

`ACCESS_TOKEN_SECRET`

`ACCESS_TOKEN_EXPIRY`

`REFRESH_TOKEN_SECRET`

`REFRESH_TOKEN_EXPIRY`


## 🚀 About Me
I'm a full stack developer...



## Tech Stack

**Client:** React or Next.js, TailwindCSS

**Server:** Node, Express, MongoDB


## Package Installation

Install nodemon

```bash
  npm i -D nodemon
```
    
Install donenv

```
  npm i dotenv
```

Install prettier

```
  npm i -D prettier
```
after install prettier create this file ".prettierrc" in project Root Folder.
and add this configuation in this file

```
// .prettierrc

{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
}
```
then create ".prettierignore" in root folder and add this configuation in this file

```
/.vscode
/node_modules
./dist

/next
/.next
next.config.js


*.env
.env
.env.local
.env.sample

README.md
```

Install express mongoose dotenv
```
npm i express mongoose dotenv
```

Add this Script to "package.json" file for configuation dotenv in es6 syntax
```
 "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
```

Install cookie-parser and cors
```
npm i cookie-parser cors
```
