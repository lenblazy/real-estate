import mongoose from 'mongoose';

const {Schema, ObjectId, model} = mongoose;

const adSchema = new Schema(
    {
        photos: [{}],
        price: {
            type: String,
            maxLength: 255,
            index: true,
        },
        address: {
            type: String,
            maxLength: 255,
            index: true,
        },
        propertyType: {
            type: String,
            default: "House",
            enum: ["House", "Apartment", "Townhouse", "Land"],
        },
        bedrooms: Number,
        bathrooms: Number,
        landSize: Number,
        landSizeType: String,
        carPark: String,
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
                default: [-1.2846038, 36.9901694]
            }
        },
        googleMap: {},
        title: {
            type: String,
            maxLength: 255,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        description: {},
        features: {},
        nearby: {},
        postedBy: {type: ObjectId, ref: "User"},
        published: {type: Boolean, default: true},
        active: {
            type: String,
            default: "Sell",
            enum: ["Sell", "Rent"]
        },
        views: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            default: "In Market",
            enum: [
                "In Market",
                "Deposit taken",
                "Under Offer",
                "Contact Agent",
                "Sold",
                "Rented",
                "Off Market",
            ]
        },
        inspectionTime: String,
    },
    {timestamps: true}
);

adSchema.index({location: "2dsphere"});

export default model('Ad', adSchema);