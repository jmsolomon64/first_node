# Challenges given to myself by myself

Created each after watching through 30 minute segments of
Caleb Curry's Node.js 3 hour tutorial. During these 30 minute
long segments I would be pausing to write notes, and deconstructing
syntax I didn't understand.

## Challenge 1

### 5/25/2023 5:12pm

---

Use prior notes to build a Node.js project that will print
a unique ID on start up. After that create a github repository
and push code up to github.

## Challenge 2

### 5/25/2023 6:04pm

---

Install both express and nodemon. Afterwards integrate nodemon
in start command, and then set up GET and POST methods.
Create some json for the cats to send off in GET method.

## Challenge 3

### 5/25/2023 7:09pm

---

Create .env file and add to .gitignore, then get dotenv to
integrate the file. Create a free MongoDB Atlas account, download
mongoose package, and integrate the DB. Connection string should
be placed in .env file.

## Challenge 4

### 5/25/2023 9:50pm

---

Need to add app.use(express.json) and add
app.use(express.urlencoded({extended: true})) to app.js. Create
a POST method to add a cat into the DB. Then create two GET
methods. One that will use parameters to get a cat by name, and
the other will grab all cats in the DB.
