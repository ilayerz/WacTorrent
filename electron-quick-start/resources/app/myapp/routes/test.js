var express = require('express');
var router = express.Router();
// var Twig = require("twig");
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index.twig', {
//         message : "Hello World"
//     });
//   // res.render('index', { title: 'Express' });
// });
//
// module.exports = router;
var WebTorrent = require('webtorrent')

var torrentId = 'http://localhost:3000/test.torrent'

var client = new WebTorrent()

// HTML elements
// var $body = document.body
// var $progressBar = document.querySelector('#progressBar')
// var $numPeers = document.querySelector('#numPeers')
// var $downloaded = document.querySelector('#downloaded')
// var $total = document.querySelector('#total')
// var $remaining = document.querySelector('#remaining')
// var $uploadSpeed = document.querySelector('#uploadSpeed')
// var $downloadSpeed = document.querySelector('#downloadSpeed')

// Download the torrent
client.add(torrentId, {path: './public'}, function (torrent) {

    // Torrents can contain many files. Let's use the .mp4 file
    var file = torrent.files.find(function (file) {
        return file
    })

    // Stream the file in the browser
    // file.appendTo('#output')

    // Trigger statistics refresh
    torrent.on('done', onDone)
    setInterval(onProgress, 500)
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
        onProgress()
    }
})

// Human readable bytes util
function prettyBytes(num) {
    // var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    // if (neg) num = -num
    // if (num < 1) return (neg ? '-' : '') + num + ' B'
    // exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    // num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    // unit = units[exponent]
    // return (neg ? '-' : '') + num + ' ' + unit
}
