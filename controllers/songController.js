const {Song} = require('../models');

module.exports.viewAll = async function(req, res, next){
    const songs = await Song.findAll({
        where: {
            user_id: req.user.id
        }
    });
    res.render('index', {songs});
}

module.exports.renderEditForm = async function (req, res){
    const song = await Song.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }});
    if (!song) {
        res.redirect('/')
    } else {
        res.render('edit', {song});
    }
};

module.exports.updateSong = async function(req, res) {
    await Song.update(
        {
            song_time: req.body.song_time,
            image: req.body.image,
            song_title: req.body.song_title,
            artist_name: req.body.artist_name
        },
        {
            where:
                {
                    id: req.params.id
                }
        });
    res.redirect('/')
}

module.exports.deleteSong = async function (req, res) {
    await Song.destroy(
        {
            where:
                {
                    id: req.params.id,
                    user_id: req.user.id
                }
    })
    res.redirect('/');
}

module.exports.renderAddForm = function (req, res){
    const song = {
        song_time: "",
        image: "",
        song_title: "",
        artist_name: ""
    };
    res.render('add', {song});
}

module.exports.addSong = async function(req, res){
    await Song.create(
        {
            song_time: req.body.song_time,
            image: req.body.image,
            song_title: req.body.song_title,
            artist_name: req.body.artist_name,
            user_id: req.user.id
        });
    res.redirect('/')
}
