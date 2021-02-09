import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';

import ShortUrl from './models/shortUrl.js';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({
	extended: false
}));

try {
	await mongoose.connect('mongodb://localhost/url-shortener', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (error) {
	console.log(error);
}

app.get('/', async (req, res) => {
	const find = await ShortUrl.find().lean();
	res.render('home', {
		shortUrls: find,
	});
});

app.post('/shortUrls', async (req, res) => {
	await ShortUrl.create({
		full: req.body.fullUrl,
	});
	res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('server running');
});