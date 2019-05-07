var express = require('express');
var router = express.Router();
var Twig = require("twig");
var WebTorrent = require('webtorrent')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.twig', {
        message : "Hello World"
    });
});

router.post('/torrent', function(req, res, next) {
    // var WebTorrent = require('webtorrent')
    console.log('referf');

    var client = new WebTorrent()

// Sintel, a free, Creative Commons movie
    var torrentId = req.body.id;

    console.log(req.body.id);

    client.add(torrentId, {path: req.body.path }, function (torrent) {
        console.log('test');
        // Torrents can contain many files. Let's use the .mp4 file
        var file = torrent.files.find(function (file) {
            return file
        })

        torrent.on('done', onDone)
        var test = setInterval(onProgress, 500)
        onProgress()

        // Statistics
        function onProgress () {
            // console.log('test')
            console.log(Math.round(torrent.progress * 100 * 100) / 100);
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
            console.log('finish');
            clearInterval(test);
        }
    })
});

module.exports = router;
