const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({

        title: Joi.string().trim().required(),

        description: Joi.string().trim().allow(""),

        gender: Joi.string()
            .valid("boys", "girls")
            .required(),

        price: Joi.number()
            .min(0)
            .required(),

        address: Joi.string()
            .trim()
            .required(),

        location: Joi.object({
            type: Joi.string()
                .valid("Point")
                .required(),

            coordinates: Joi.array()
                .items(Joi.number())
                .length(2)
                .required()
        }).required(),

        amenities: Joi.array()
            .items(Joi.string()),

        images: Joi.array()
            .items(
                Joi.object({
                    url: Joi.string().uri().allow(""),
                    filename: Joi.string().allow("")
                })
            )

    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        comment : Joi.string().required(),
        rating : Joi.number().required().min(1).max(5),
    }).required()
});
