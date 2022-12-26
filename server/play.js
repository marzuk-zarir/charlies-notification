const { Level } = require('level')

const level = new Level('./db', { valueEncoding: 'json' })

level.put('foo', 'bar 🎅')

async function main() {
  console.log(await level.get('foo'))
}

main()
