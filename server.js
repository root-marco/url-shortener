import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

try {
	await mongoose.connect('mongodb://localhost/urlShortener', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (error) {
	handleError(error); 
}

app.get('/', (req, res) => {
	res.render('home');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('server running');
});