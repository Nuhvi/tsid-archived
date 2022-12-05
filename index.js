const ALPHAPET = '234567abcdefghijklmnopqrstuvwxyz'

function encode (i) {
  let s = ''
  while (i) {
    const c = i % 32
    i = Math.floor(i / 32)
    s = ALPHAPET.charAt(c) + s
  }
  return s
};

function decode (s) {
  let i = 0
  for (const c of s) {
    i = i * 32 + ALPHAPET.indexOf(c)
  }
  return i
}

let last = 0
let milliSeconds = 0
const clockid = _clockid()

function micro (timestamp) {
  if (timestamp === last) {
    milliSeconds++
  } else {
    milliSeconds = 0
  }
  last = timestamp
  return (timestamp * 1000) + milliSeconds
}

function _clockid () {
  return Math.floor(Math.random() * 64)
}

export default class TSID {
  static next () {
    return TSID.fromTime(Date.now(), clockid)
  }

  static fromTime (timestamp, clockid = _clockid()) {
    return `${encode(micro(timestamp))}${encode(clockid).padStart(2, '2')}`
  }

  static timestamp (tsid) {
    const substr = tsid.slice(0, 11)
    return Math.floor(decode(substr) / 1000)
  }
}
