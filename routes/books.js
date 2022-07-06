const router = require("express").Router();

const books = [
    {
        id: 1,
        title: "Harry Potter and the Philosopher's Stone",
        reviews: [
            {
                id: 1,
                comment: "Nice"
            }
        ]
    }
];

const checkIfBookExists = (req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);

    if (!book) {
        return next({ status: 404, massage: "Book not found" });
    }
    next();
}
const checkIfReviewExists = (req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);
    const review = book.reviews.find(review => String(review.id) === req.params.reviewId)
    if (!review) {
        return next({ status: 404, massage: "Review not found" });
    }
    next();
}

router.get("/", (req, res, next) => {
    res.json(books);
});

router.get("/:id",
    checkIfBookExists,
     (req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);
    res.status(200).send(book);
});

router.post("/", (req, res, next) => {
    const titleBook = req.body.title;
    const book = { id: books.length + 1, title: titleBook, reviews: [] };
    
    books.push(book);
    
    res.status(200).send(book);
})

router.put("/:id", (req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);
    book.title = req.body.title;
    res.status(200).send(book);
});

router.get("/:id/reviews", (req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);
    res.status(200).send(book.reviews);
});

router.post("/:id/reviews", (req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);
    book.reviews.push({ id: book.reviews.length + 1, comment: req.body.comment});  

    res.status(200).send(book);
})

router.delete("/:id/reviews/:reviewId",
checkIfReviewExists,
(req, res, next) => {
    const bookId = req.params.id;
    const book = books.find(book => String(book.id) === bookId);

    const reviewIndex = book.reviews.findIndex(review => String(review.id) === req.params.reviewId)
    if (reviewIndex >-1) {
        book.reviews.splice(reviewIndex, 1);  
    }

    res.status(200).send(book);
})

module.exports = router;