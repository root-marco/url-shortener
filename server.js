import express from 'express';
import exphbs from 'express-handlebars';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('home');
});

app.listen(process.env.PORT || 3000, () => {
	console.log('server running');
});