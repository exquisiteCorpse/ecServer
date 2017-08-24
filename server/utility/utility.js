/***
 * mergePhotos - creates the Corpse static image file
 * @param corpseId      corpseId
 * @param corpsePath    path to corpseId's directory
 * @param appendValue   -append for vertical, +append for horizontal
 */
const PIXEL_HEIGHT = 75
const Promise = require('bluebird')
const im = require('imagemagick')
const fs = require('fs')
const Bucket = 'exquisitecorpse-s3-001'
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json')
const s3Bucket = new AWS.S3({params: {Bucket: Bucket}})
const PHOTO_HEIGHT = 215
const PHOTO_EDGE_HEIGHT = 40

const mergePhotos = (files, appendValue = '-append') => {
  return new Promise((resolve, reject) => {
    const top = `tmp/ORIGINAL-${files[0].filename}`
    const middle = `tmp/ORIGINAL-${files[1].filename}`
    const bottom = `tmp/ORIGINAL-${files[2].filename}`
    const id = files[0].filename.split('-')[0]
    const corpseFile = `tmp/corpse-${id}.jpeg`
    const imagesToConvert = [appendValue,
      `${top}`,
      `${middle}`,
      `${bottom}`,
      `${corpseFile}`]
    im.convert(imagesToConvert, (err) => {
      if (err) reject(err)
      else {
        resolve({
          Key: corpseFile.slice(4),
          Body: fs.readFileSync(corpseFile),
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg'
        })
      }
    })
  })
}

const getFromS3Bucket = (Key) => {
  console.log(`-- S3 GET\t${Key}`)
  return new Promise((resolve, reject) => {
    const params = {Bucket, Key}
    s3Bucket.getObject(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// photos and corpse api's use this
const sendToS3Bucket = (data) => {
  console.log(`-- S3 PUT\t${data.Key}`)
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, (err) => {
      if (err) reject(err)
      else resolve({filename: data.Key})
    })
  })
}

const imIdentify = (fileName, edge = false) => {
  const prefix = edge ? 'tmp/' : 'tmp/ORIGINAL-'
  console.log(`-- Identifying\t${prefix}${fileName}`)
  return new Promise((resolve, reject) => {
    im.identify(`${prefix}${fileName}`, (err, data) => {
      if (err) reject(err)
      else resolve({data, fileName})
    })
  })
}

const imCrop = (fileObj, edge = false) => {
  const prefix = edge ? 'tmp/' : 'tmp/ORIGINAL-'
  console.log(`-- Cropping\t${prefix}${fileObj.fileName}`)
  return new Promise((resolve, reject) => {
    let srcPath, dstPath, width, height, gravity
    if (edge) {
      srcPath = `${prefix}${fileObj.fileName}`
      dstPath = `tmp/${fileObj.fileName.replace(/.jpeg/, '-edge.jpeg')}`
      height = PHOTO_EDGE_HEIGHT
      gravity = 'South'
    } else {
      srcPath = `${prefix}${fileObj.fileName}`
      dstPath = `tmp/${fileObj.fileName}`
      height = PHOTO_HEIGHT
      gravity = 'North'
    }
    width = fileObj.data.width
    im.crop({srcPath, dstPath, width, height, quality: 1, gravity}, (err) => {
      if (err) reject(err)
      else resolve({filename: dstPath.replace(/^tmp\//, '')})
    })
  })
}

const imCropRemoveMask = (fileObj) => {
  const prefix = 'tmp/ORIGINAL-'
  console.log(`-- Removed Mask\t${prefix}${fileObj.fileName}`)
  return new Promise((resolve, reject) => {
    const srcPath = `${prefix}${fileObj.fileName}`
    const dstPath = `tmp/UNMASKED-${fileObj.fileName}`
    const height = fileObj.data.height - PHOTO_EDGE_HEIGHT
    const gravity = 'South'
    const width = fileObj.data.width
    im.crop({srcPath, dstPath, width, height, quality: 1, gravity}, (err) => {
      if (err) reject(err)
      else resolve({filename: dstPath.replace(/^tmp\//, '')})
    })
  })
}

const renameFile = (oldfilename, newfilename) => {
  return new Promise((resolve, reject) => {
    console.log(`-- Renaming \t${oldfilename} to ${newfilename}`)
    fs.rename(`tmp/${oldfilename}`, `tmp/${newfilename}`, (err) => {
      if (err) reject(err)
      else resolve({filename: newfilename.replace(/ORIGINAL-/,'')})
    })
  })
}

const createTmpFile = (fileName, fileData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`tmp/ORIGINAL-${fileName}`, fileData, (err) => {
      if (err) reject(err)
      else resolve({filename: fileName})
    })
  })
}

const deleteTmpFile = (filename) => {
  console.log(`-- Deleting\ttmp/${filename}`)
  return new Promise((resolve, reject) => {
    fs.unlink(`tmp/${filename}`, (err) => {
      if (err) reject(err)
      else {
        resolve({filename})
      }
    })
  })
}

const getPhotoData = (filename) => {
  console.log(`-- Cropping\ttmp/${filename}`)
  return new Promise((resolve, reject) => {
    fs.readFile(`tmp/${filename}`, (err, data) => {
      if (err) reject(err)
      else resolve({data, filename})
    })
  })
}

module.exports = {
  mergePhotos,
  imIdentify,
  imCrop,
  imCropRemoveMask,
  sendToS3Bucket,
  createTmpFile,
  deleteTmpFile,
  getPhotoData,
  getFromS3Bucket,
  renameFile
}
