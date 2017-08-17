/***
 * mergePhotos - creates the Corpse static image file
 * @param corpseId      corpseId
 * @param corpsePath    path to corpseId's directory
 * @param appendValue   -append for vertical, +append for horizontal
 */
const im = require('imagemagick')

const mergePhotos = (corpseId, corpsePath, appendValue = '-append') => {
  return new Promise((resolve, reject) => {
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

const imIdentify = (filePath) => {
  return new Promise((resolve, reject) => {
    im.identify(filePath, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const imCrop = (cropConfig) => {
  return new Promise((resolve, reject) => {
    im.crop(cropConfig, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {mergePhotos, imIdentify, imCrop}
