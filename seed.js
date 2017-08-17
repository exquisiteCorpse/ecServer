const db = require('./server/db/index')
let Promise = require('bluebird')

const _users =  [
  { 'username' : 'shayne',
    'password' : '12345',
    'email' : 'shayne@ecorp.com'
  },
  {
    'username' : 'lina',
    'password' : '12345',
    'email' : 'lina@ecorp.com'

  },
  {
    'username' : 'fara',
    'password' : '12345',
    'email' : 'fara@ecorp.com'
  },
  {
    'username' : 'kevin',
    'password' : '12345',
    'email' : 'kevin@ecorp.com'
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
  {title: 'Shoe Mash', totalCells: 3, userId: 1, complete: true, id: 1},
  {title: 'Shoe Mash BW', totalCells: 3, userId: 1, complete: true, id: 2},
  {title: 'Shoe City', totalCells: 3, userId: 1, id: 3}
]

const _photo = [
  {id: 1, imgUrl: '/1/1-top.jpg', cell: 'top', corpseId: 1, userId: 1},
  {id: 2, imgUrl: '/1/1-middle.jpg', cell: 'middle', corpseId: 1, userId: 2},
  {id: 3, imgUrl: '/1/1-bottom.jpg', cell: 'bottom', corpseId: 1, userId: 3},
  {id: 4, imgUrl: '/2/2-top.jpg', cell: 'top', corpseId: 2, userId: 1},
  {id: 5, imgUrl: '/2/2-middle.jpg', cell: 'middle', corpseId: 2, userId: 2},
  {id: 6, imgUrl: '/2/2-bottom.jpg', cell: 'bottom', corpseId: 2, userId: 1},
  {id: 7, imgUrl: '/3/3-top.jpg', cell: 'top', corpseId: 3, userId: 1}
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
