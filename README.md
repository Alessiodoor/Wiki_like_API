# Wiki_like_API
Wiki like API app with nodejs and mongoDb
This APIs is used to retreive the data from a mongoDb database

## Installation

This web app is made be nodeJs that can be downloaded from this link https://nodejs.org/it/download/ 

To install the packages you need to use npm, first of all go to the project repository and run the following commands

```bash
npm init
```

After this you will find a file called package.json in your repository.
Than you need to install all the packages

```bash
npm install express body-parser ejs mongoose
```

You can see the packages installed in the package.json file, under the 'dependencies' variable.

## Database

The data is retrieved from a database called wikiDB, that will be automaticaly create in localhost when the app is runned for the first time. Also a collection called articles is created where each document have the following structure.

```json
  article {
    "title": "String",
    "content": "String"
  }
```
