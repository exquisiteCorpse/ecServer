/***
 * mergePhotos - creates the Corpse static image file
 * @param corpseId      corpseId
 * @param corpsePath    path to corpseId's directory
 * @param appendValue   -append for vertical, +append for horizontal
 */
const Promise = require('bluebird')
const im = require('imagemagick')
const fs = require('fs')
const Bucket = 'exquisitecorpse-s3-001'
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json')
const s3Bucket = new AWS.S3({params: {Bucket: Bucket}})

const mergePhotos = (files, appendValue = '-append') => {
  return new Promise((resolve, reject) => {
    const top = files[0].filename
    const middle = files[1].filename
    const bottom = files[2].filename
    const id = top.slice(4).split('-')[0]
    const corpseFile = `tmp/ExquisiteCorpse${id}.jpg`
    const imagesToConvert = [appendValue,
      `${top}`,
      `${middle}`,
      `${bottom}`,
      `${corpseFile}`]
    im.convert(imagesToConvert, (err) => {
      if (err) reject(err)
      else resolve({filename: corpseFile})
    })
  })
}

/******************************************************/

const getFromS3Bucket = (Key) => {
  return new Promise((resolve, reject) => {
    const params = {Bucket, Key}
    s3Bucket.getObject(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

/******************************************************/
const sendToS3Bucket = (data) => {
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, (err) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const imIdentify = (fileName) => {
  return new Promise((resolve, reject) => {
    im.identify(fileName, (err, data) => {
      if (err) reject(err)
      else resolve({data, fileName})
    })
  })
}

const imCrop = (fileObj) => {
  return new Promise((resolve, reject) => {
    const edgeFileName = fileObj.fileName.split('.')[0] + '-edge.jpeg'
    im.crop({
      srcPath: fileObj.fileName,
      dstPath: edgeFileName,
      width: fileObj.data.width,
      height: 75,
      quality: 1,
      gravity: 'South'
    }, (err, data) => {
      if (err) reject(err)
      else resolve({edgeFileName})
    })
  })
}

const createTmpFile = (fileName, fileData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`tmp/${fileName}`, fileData, (err) => {
      if (err) reject(err)
      else resolve({filename: `tmp/${fileName}`})
    })
  })
}

const deleteTmpFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.unlink(`tmp/${fileName}`, (err) => {
      if (err) reject(err)
      else resolve(fileName)
    })
  })
}

const getPhotoData = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err)
      else resolve({data})
    })
  })
}


module.exports = {
  mergePhotos,
  imIdentify,
  imCrop,
  sendToS3Bucket,
  createTmpFile,
  deleteTmpFile,
  getPhotoData,
  getFromS3Bucket
}
