const db = require('./server/db/index')
let Promise = require('bluebird')

const _users =  [
  {
    "facebookId" : "106154976783622",
    "username" : "Barbara Bozo",
    "email" : "barbara_iqpskbq_bozo@tfbnw.net",

  },
  {
    "facebookId" : "112484276147516",
    "username" : "Joe Laustein",
    "email" : "joe_rnufumq_laustein@tfbnw.net",
  },
  {
    "facebookId" : "112048849524675",
    "username" : "Margaret Cho",
    "email" : "margaret_wjvdqka_cho@tfbnw.net",
  },
  {
    "facebookId" : "108559403209100",
    "username" : "Leroy Jenkins",
    "email" : "leroy_krlrckx_jenkins@tfbnw.net",
  },
]



const _Friend = [
  {
    'userId' : 1,
    'friendId' : 2
  },
  {
    'userId' : 1,
    'friendId' : 3
  },
  {
    'userId' : 1,
    'friendId' : 4
  },
  {
    'userId' : 2,
    'friendId' : 1
  },
  {
    'userId' : 2,
    'friendId' : 3
  },
  {
    'userId' : 2,
    'friendId' : 4
  },
  {
    'userId' : 3,
    'friendId' : 1
  },
  {
    'userId' : 3,
    'friendId' : 2
  },
  {
    'userId' : 3,
    'friendId' : 4
  },
  {
    'userId' : 4,
    'friendId' : 1
  },
  {
    'userId' : 4,
    'friendId' : 2
  },
  {
    'userId' : 4,
    'friendId' : 3
  }
]

const _corpse = [
  {title: 'Shoe Mash', totalCells: 3, userId: 1, complete: true},
  {title: 'Shoe Mash BW', totalCells: 3, userId: 1, complete: true},
  {title: 'Shoe City', totalCells: 3, userId: 1}
]

const _photo = [
  {imgUrl: '1-1-top.jpeg', cell: 'top', corpseId: 1, userId: 1},
  {imgUrl: '1-2-middle.jpeg', cell: 'middle', corpseId: 1, userId: 2},
  {imgUrl: '1-3-bottom.jpeg', cell: 'bottom', corpseId: 1, userId: 3},
  {imgUrl: '2-1-top.jpeg', cell: 'top', corpseId: 2, userId: 1},
  {imgUrl: '2-2-middle.jpeg', cell: 'middle', corpseId: 2, userId: 2},
  {imgUrl: '2-1-bottom.jpeg', cell: 'bottom', corpseId: 2, userId: 1},
  {imgUrl: '3-1-top.jpeg', cell: 'top', corpseId: 3, userId: 1, edgeUrl: '3-1-top-edge.jpeg'}
]

const _assignment = [
  {complete: true, cell: 'middle', corpseId: 1, assignorId: 1, assigneeId: 2, photoId: 1},
  {complete: true, cell: 'bottom', corpseId: 1, assignorId: 2, assigneeId: 3, photoId: 2},
  {complete: true, cell: 'middle', corpseId: 2, assignorId: 1, assigneeId: 2, photoId: 4},
  {complete: true, cell: 'bottom', corpseId: 2, assignorId: 2, assigneeId: 3, photoId: 5},
  {complete: false, cell: 'middle', corpseId: 3, assignorId: 1, assigneeId: 4, photoId: 7}
]

const _like = [
  {
    'userId' : 1,
    'corpseId' : 2
  },
  {
    'userId' : 2,
    'corpseId' : 2
  },
  {
    'userId' : 3,
    'corpseId' : 2
  },
  {
    'userId' : 4,
    'corpseId' : 1
  },
  {
    'userId' : 3,
    'corpseId' : 1
  },
  {
    'userId' : 2,
    'corpseId' : 1
  }
]

let seed = (_seedData, model) => {
  return Promise.map(_seedData, (data) => {
    return db.model(model).create(data)
  })
}

db.sync({force: true})
  .then(() => {
      console.log('dropped old data, now inserting new data')
  })
  .then(() => seed(_users, 'user'))
  .then(users => console.log(`Seeded ${users.length} users OK!`))
   .then(() => seed(_Friend, 'Friend'))
   .then(friends => console.log(`Seeded ${friends.length} Friend OK!`))
   .then(() => seed(_corpse, 'corpse'))
   .then(corpses => console.log(`Seeded ${corpses.length} corpses OK!`))
   .then(() => seed(_photo, 'photo'))
   .then(photos => console.log(`Seeded ${photos.length} photos OK!`))
   .then(() => seed(_assignment, 'assignment'))
   .then(assignments => console.log(`Seeded ${assignments.length} assignments OK!`))
   .then(() => seed(_like, 'like'))
   .then(likes => console.log(`Seeded ${likes.length} likes OK!`))
  .then(() => {
    console.log('Seeding complete OK!')
  })
  .catch((err) => {
    console.error('There was a problem seeding the database', err, err.stack)
  })
  .finally(() => {
    db.close()
    console.log('seed db connection closed OK!')
    return null
  })
