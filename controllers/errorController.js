module.exports = function (err, req, res, next) {
	console.error(err);

	// res.status(500).render('error', { message: 'Something went wrong' });
	res.status(500).send('Something went wrong');
};
