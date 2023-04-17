const { map } = require('lodash');

async function validator(
	content,
	schema,
	code,
	request,
	response,
	next
) {
	try {
		await schema.validateAsync(content);
		return next();
	} catch (error) {
		return response.status(400).json({
			error: `${map(error.details, ({ message }) =>
				message.replace(/['"]/g, '')
			).join(' and ')}, please check your content and try again.`
		});
	}
}

module.exports = function(schema, code) {
	return async function(request, response, next) {
		validator(request.body, schema, code, request, response, next);
	};
};