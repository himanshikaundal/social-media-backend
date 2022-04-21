const createError = require('http-errors');

const Feed = require('../models/Feed')
const Joi = require('joi');


module.exports = {

    create: async (req, res, next) => {
        try {
            const schema = Joi.object({
                content: Joi.string().required(),
                media: Joi.array().max(10).items(Joi.object({
                    type: Joi.string(),
                    url: Joi.string()
                })),

            },

            )
           

            const { value, error } = schema.validate(req.body);
            console.log(req.file);

            const feed = new Feed({
                content: value.content,
                media: req.file
            });
            feed.createby = req.loggedInUser._id;

            const result = await feed.save();
            res.success(result);

        }
        catch (error) {
            return next(error);
        }

    },

    getAll: async (req, res, next) => {
        try {
            const feed = await Feed.find();
            if (!feed) return next(createError(400, 'no such post exist'));

            res.success(feed);
        }
        catch (error) {
            return next(error)
        }

    },

    update: async (req, res, next) => {
        try {

            const schema = Joi.object({
                content: Joi.string().required(),
                media: Joi.array().max(10).items(Joi.object({
                    type: Joi.string().required(),
                    url: Joi.string().required()
                }))
            })

            const { value, error } = schema.validate(req.body);

            const result = await Feed.findByIdAndUpdate(req.params.id, value, { new: true })

            await result.save();
            res.success(result);
            console.log(result);
        }
        catch (err) {
            return next(err);
        }

    }


    ,

    delete: async (req, res, next) => {


        try {
            const feed = await Feed.findByIdAndDelete(req.params.id)
            res.success(feed);

        }
        catch (err) {
            return next(createError(400, err));
        }

    }








}