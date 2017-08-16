/***
 * mergePhotos - creates the Corpse static image file
 * @param corpseId      corpseId
 * @param corpsePath    path to corpseId's directory
 * @param appendValue   -append for vertical, +append for horizontal
 */
const im = require('imagemagick')
const mergePhotos = (corpseId, corpsePath, appendValue = '-append') => {
  const imagesToConvert = [appendValue,
    `${corpsePath}/${corpseId}-top.jpg`,
    `${corpsePath}/${corpseId}-middle.jpg`,
    `${corpsePath}/${corpseId}-bottom.jpg`,
    `${corpsePath}/ExquisiteCorpse${corpseId}.jpg`]
  im.convert(imagesToConvert, (err) => {
    if (err) throw console.error('generateCorpsImage', err)
  })
}

module.exports = {mergePhotos}
