exports.handleSQLError = (fn) => (err, results, fields) => {
	if (err) throw err;

	fn(results, fields);
};

exports.handleExpressError = (fn) => (req, res, next) => {
	try {
		fn(req, res, next);
	} catch (error) {
		return next(error);
	}
};

exports.restrictFields = (data, ...allowedFields) => {
	const keys = Object.keys(data);
	const obj = {};

	keys.forEach((key) => allowedFields.includes(key) && (obj[key] = data[key]));

	return obj;
};
