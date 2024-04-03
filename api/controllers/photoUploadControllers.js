const imageDownloader = require('image-downloader');
const fs = require('fs');


const handlePhotoUploadByLink = async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: '../../uploads/' + newName,
    });
    res.json(newName);
}

const handlePhotoUpload = async (req, res) => {
    let uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path } = req.files[i]
        const newPath = path + '.jpg'
        fs.renameSync(path, newPath);
        const fileToAdd = newPath.split('\\');
        uploadedFiles.push(fileToAdd[fileToAdd.length - 1]);
    }
    res.json(uploadedFiles);
}

const handleDeletePhoto = async (req, res) => {
    const { filename } = req.params;
    await fs.unlink('./uploads/' + filename, (err) => {
        if (err) throw err;
    })
    res.json('deleted');
}

module.exports = { handlePhotoUploadByLink, handlePhotoUpload, handleDeletePhoto }