var Song = require('../models/song');
var _ = require('lodash');

exports.allSongs = function(req,res){
	Song.find({},function(err,song){
		if(err) return err;
		res.status(200).json(song);
	});
};

exports.createSong = function(req,res){
	var newSong = new Song({
		title: req.body.title,
		author: req.body.author,
		duration: req.body.duration,
		genre: req.body.genre
	});

	newSong.save(function(err,songSaved){
		if(err) return err;
		res.status(201).json(songSaved);
	});
};

exports.getSong = function(req,res){
	res.status(200).json(req.song);
};

exports.updateSong = function(req,res){
	var songUpdate = _.assign(req.song, req.body);
	songUpdate.save(function(err,song){
		if (err) return err;
		res.status(200).json(song);
	})
};

exports.removeSong = function(req,res){
	var songToTrash = req.song;
	songToTrash.remove(function(err,song){
		if (err) return err;
		res.status(200).json(song);
	});
};

exports.songByID = function(req, res, next, id) {
	Song.findById({'_id':id},function(err,song){
		if (err) return err;
		if(!song) return next(new Error('Canción ' + id+' no encontrada'));
		req.song = song;
		next();
	})
};
