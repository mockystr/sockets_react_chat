var express = require('express');
var app = express();
var path = require('path');

const PORT = 3002;

app.use(express.static('../build'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..' , '/build/index.html'));
});

app.listen(PORT, function() {console.log(`Server is running on ${PORT}`)});