import test from 'brittle'

import TSID from './index.js'

test('unique ids in the same second', async (t) => {
  const list = []

  for (let i = 0; i <= 1200; i++) {
    list.push(TSID.next())
  }

  const sorted = [...list].sort((a, b) => a > b ? 1 : -1)

  t.alike(sorted, list, 'should correctly sort ids')
  t.alike(list.length, new Set([...list]).size, 'should create unique ids')
})

test('timestamp from tsid', (t) => {
  const timestamp = Date.now()
  const tsid = TSID.fromTime(timestamp, 123)

  t.is(TSID.timestamp(tsid), timestamp, 'parse timestamp from tsid')
})

test('unique clocks', (t) => {
  const timestamp = 1670265293599
  const otherClockTSID = '3jj55ss4wcs2n'
  const tsid = TSID.fromTime(timestamp)

  t.is(TSID.timestamp(tsid), TSID.timestamp(otherClockTSID), 'same timestamp')
  t.not(TSID.fromTime(timestamp), otherClockTSID, 'unique tsid')
})
