const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });
// const upload = multer({ dest: 'uploads/' })

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync (listingController.createListing)
    )
    // .post(upload.single('listing[image]'),(req,res) =>{
    //     res.send(req.file);
    //     console.log(req.file);
    // })

//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );


//index route
// router.get("/",wrapAsync(listingController.index));

//show route
// router.get("/:id",wrapAsync(listingController.showListing));

//create listing  route and post
// router.post("/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync (listingController.createListing));

// edit route || edit listing
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

//update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
// );

//Delete route || delete listing
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing)
// );

module.exports = router;
