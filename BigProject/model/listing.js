const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["boys", "girls"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function(val) {
                    return val.length === 2;
                },
                message: "Coordinates must be [longitude, latitude]",
            },
        },
    },
    amenities: [String],
    images: [
        {
            url : String,
            filename : String,
        },
    ],
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
}, { timestamps: true });

listingSchema.index({ location: "2dsphere" });

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
        await Review.deleteMany({ _id : { $in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
