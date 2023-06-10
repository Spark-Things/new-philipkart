const cloudinary = require('cloudinary').v2;
const {cloud_name,api_key,api_secret} = require('./config/Keys')

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
})

module.exports = cloudinary;