const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

const booksRouter = require("./routes/books.js");

app.use("/books", booksRouter);

const errorHandler = (err,req, res, next) =>{
if (err.status) {
    return res.status(err.status).json({ massage: err.massage })
}
res.sendStatus(500);
}

app.use(errorHandler)

app.listen(port, ()=>console.log(`lisening on port ${port}`));