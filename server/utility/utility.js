/***
 * mergePhotos - creates the Corpse static image file
 * @param corpseId      corpseId
 * @param corpsePath    path to corpseId's directory
 * @param appendValue   -append for vertical, +append for horizontal
 */
const im = require('imagemagick')
const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json')
const s3Bucket = new AWS.S3({params: {Bucket: 'exquisitecorpse-s3-001'}})

const mergePhotos = (corpseId, corpsePath, appendValue = '-append') => {
  return new Promise((resolve, reject) => {

    const corpse = {}
    corpse.id = corpseId

    corpse.top = s3Bucket.getObject({Bucket: s3Bucket.params.Bucket, Key: `${corpseId}-top.jpeg`})

    corpse.middle = s3Bucket.getObject({Bucket: s3Bucket.params.Bucket, Key: `${corpseId}-middle.jpeg`})

    corpse.bottom = s3Bucket.getObject({Bucket: s3Bucket.params.Bucket, Key: `${corpseId}-bottom.jpeg`})

    const imagesToConvert = [appendValue,
      `${corpsePath}/${corpseId}-top.jpg`,
      `${corpsePath}/${corpseId}-middle.jpg`,
      `${corpsePath}/${corpseId}-bottom.jpg`,
      `${corpsePath}/ExquisiteCorpse.jpg`]
    im.convert(imagesToConvert, (err, data) => {
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
    fs.unlink(fileName, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const getPhotoData = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const sendToS3Bucket = (data) => {
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {mergePhotos, imIdentify, imCrop, sendToS3Bucket, createTmpFile, deleteTmpFile, getPhotoData}
