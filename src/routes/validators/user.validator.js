const Joi = require('joi');

const registrationSchema = Joi.object()
	.keys({	
		username: Joi.string().min(3).max(64).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(64)
	});

const loginSchema = Joi.object()
	.keys({
		username: Joi.string().min(3).max(64).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(64)
	});

module.exports = 
  registrationSchema, 
loginSchema;