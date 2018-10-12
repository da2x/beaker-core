const lock = require('../lib/lock')
const db = require('./profile-data-db')

class BadParamError extends Error {
  constructor (msg) {
    super()
    this.name = 'BadParamError'
    this.message = msg
  }
}

// exported methods
// =

exports.addSite = async function (profileId, url, opts) {
  var release = await lock('watchlist-db')
  try {
    // get date for timestamp in seconds floored
    var ts = (Date.now() / 1000 | 0)

    // check if site already being watched
    var site = await db.get('SELECT rowid, * from watchlist WHERE profileId = ? AND url = ?', [profileId, url])
    if (site) {
      throw "Site already being watched."
    } else {
      // add site to watch list
      site = await db.run('INSERT INTO watchlist (profileId, url, description, seedWhenResolved, createdAt) VALUES (?, ?, ?, ?, ?);', [profileId, url, opts.description, opts.seedWhenResolved, ts])
    }
  } finally {
    release()
  }
  return site
}

exports.getSites = async function (profileId) {
  return await db.all(`SELECT * FROM watchlist WHERE profileId = ?1`, [profileId])
}

exports.updateWatchlist = async function (profileId, site, opts) {
  var combine = Object.assign(site, opts)
  var updatedAt = (Date.now() / 1000 | 0)

  var release = await lock('watchlist-db')
  try {
    await db.run(`UPDATE watchlist SET seedWhenResolved = ?, resolved = ?, updatedAt = ?
    WHERE profileId = ? AND url = ?`, [combine.seedWhenResolved, combine.resolved, updatedAt, profileId, combine.url])
  } finally {
    release()
  }
}

exports.removeSite = async function (profileId, url) {
  return db.run(`DELETE FROM watchlist WHERE profileId = ? AND url = ?`, [profileId, url])
}