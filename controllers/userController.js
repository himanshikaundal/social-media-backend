const createError = require('http-errors');
const jsonwebtoken = require('jsonwebtoken');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

module.exports = {
    login: async (req, res, next) => {
        try {
            const schema = Joi.object({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            });

            const { value, error } = schema.validate(req.body);
            if (error) return next(createError(400, error.message));
            
            
            console.log(value.username);
            // db connection

            const isPasswordMatched = bcryptjs.compareSync(value.password, "hash"); // hash will be comes from db
            if (!isPasswordMatched) return next(createError(400, "Username and password is invalid"));

            const token = jsonwebtoken.sign({
                data: { id: 1 } // user object
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

            res.success({
                token: token,
                user: {
                    id: 1
                }
            });
        } catch (error) {
            return next(createError(500, error.message));
        }
    },
}