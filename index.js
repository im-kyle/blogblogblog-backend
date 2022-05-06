const app = require('./app.js');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`API is listening to port ${port}`)
});

module.exports = app;