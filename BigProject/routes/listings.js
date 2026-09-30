const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../model/listing");
const { isLoggedInApi, isOwnerApi } = require("../middleware/apiAuth.js");
const {
  normalizeNestedBody,
  validateListing,
} = require("../middleware/validation.js");

const { upload } = require("../config/multer.js");
const {
  uploadFilesToCloudinary,
  deleteLocalFiles,
  deleteCloudinaryImages,
} = require("../utils/fileUpload.js");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.json({ listings });
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");
    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }
    res.json({ listing });
  })
);

router.post(
  "/",
  isLoggedInApi,
  upload.array("listing[images]", 5),
  normalizeNestedBody,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const files = req.files || [];
    if (files.length === 0) {
      return next(new ExpressError(400, "At least one image is required"));
    }

    let uploadedImages = [];

    try {
      uploadedImages = await uploadFilesToCloudinary("wanderlust_DEV", files);

      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.images = uploadedImages;

      await newListing.save();
      res.status(201).json({ listing: newListing });
    } catch (error) {
      await deleteCloudinaryImages(uploadedImages);
      throw error;
    } finally {
      await deleteLocalFiles(files);
    }
  })
);

router.put(
  "/:id",
  isLoggedInApi,
  isOwnerApi,
  upload.array("listing[images]", 5),
  normalizeNestedBody,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    Object.assign(listing, req.body.listing);

    const files = req.files || [];
    let uploadedImages = [];

    try {
      if (files.length > 0) {
        uploadedImages = await uploadFilesToCloudinary("wanderlust_DEV", files);
        listing.images = [...(listing.images || []), ...uploadedImages];
      }

      await listing.save();
      res.json({ listing });
    } catch (error) {
      await deleteCloudinaryImages(uploadedImages);
      throw error;
    } finally {
      await deleteLocalFiles(files);
    }
  })
);

router.delete(
  "/:id",
  isLoggedInApi,
  isOwnerApi,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return next(new ExpressError(404, "Listing not found"));
    }
    await deleteCloudinaryImages(deletedListing.images || []);
    res.status(204).send();
  })
);

module.exports = router;
