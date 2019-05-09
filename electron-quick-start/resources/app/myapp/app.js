var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var WebTorrent = require('webtorrent')
var moment = require('moment');

var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

server.listen(3010);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var torrentidreturn = 0;

io.on('connection', function(socket){
    socket.on('test', function (data) {
        console.log(data);










        console.log('referf');

        var client = new WebTorrent()

// Sintel, a free, Creative Commons movie
        var torrentId = data.id;

        console.log(data.id);

        client.add(torrentId, {path: data.path }, function (torrent) {
            // Torrents can contain many files. Let's use the .mp4 file

            io.emit('create', torrentidreturn);
            torrentidreturn++;

            var file = torrent.files.find(function (file) {
                return file
            })

            torrent.on('done', onDone)
            var interval = setInterval(onProgress, 500)
            var data = {};
            onProgress()

            // Statistics
            function onProgress () {
                // console.log('test')
                console.log(Math.round(torrent.progress * 100 * 100) / 100);

                var remaining;
                if (torrent.done) {
                    remaining = 'Done.'
                } else {
                    remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
                    remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
                }



                var data = {
                    torrentid: torrentidreturn,
                    peers: torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers'),
                    percent: Math.round(torrent.progress * 100 * 100) / 100,
                    downloaded: prettyBytes(torrent.downloaded),
                    total: prettyBytes(torrent.length),
                    dlspeed : prettyBytes(torrent.downloadSpeed) + '/s',
                    upspeed : prettyBytes(torrent.uploadSpeed) + '/s',
                    remaining: remaining
                };
                io.emit('progress', data);
                // Peers
                // $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')
                //
                // // Progress
                // var percent = Math.round(torrent.progress * 100 * 100) / 100
                // $progressBar.style.width = percent + '%'
                // $downloaded.innerHTML = prettyBytes(torrent.downloaded)
                // $total.innerHTML = prettyBytes(torrent.length)
                //
                // // Remaining time
                // var remaining
                // if (torrent.done) {
                //     remaining = 'Done.'
                // } else {
                //     remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
                //     remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
                // }
                // $remaining.innerHTML = remaining
                //
                // // Speed rates
                // $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
                // $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
            }
            function onDone () {
                // $body.className += ' is-seed'
                clearInterval(interval);
                io.emit('finish', data)
            }

            function prettyBytes(num) {
                var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                if (neg) num = -num
                if (num < 1) return (neg ? '-' : '') + num + ' B'
                exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
                num = Number((num / Math.pow(1000, exponent)).toFixed(2))
                unit = units[exponent]
                return (neg ? '-' : '') + num + ' ' + unit
            }
        })








    })
    console.log('connected');
});

io.on('test', function (msg) {
    console.log(msg);
})

module.exports = app;
