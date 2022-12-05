# TSID

Timestamp identifier 

Zero dependency, compact, and sort-order-invariant identifier using a monotonic timestamp, and clock id.

Most useful for creating unique record ids while still encode their order of creation. 

Inspired by [AtProto TIDs](), but a bit simler.

## Features

- Unique ids within the same millisecond.
- Unique ids between machines / processes / threads.

## Example

```js
TSID.timestamp("3jj55ss4wcs2n") // 1670265293599
```

## Usage

```js
import TSID from 'tsid'

const id1 = TSID.next()
const id2 = TSID.next()

console.log(id1 == id2) // false
console.log(TSID.timestamp(id1) === TSID.timestamp(id2))
```

## API

### `const tsid = TSID.next()`

Create a new identifier. similar to `Date.now().toString()` but better. 

### `const timestamp = TSID.timestamp("3jj55ss4wcs2n")`

Read timestamp (milliseconds) from a tsid string
