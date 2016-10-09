import Debug from 'debug'

// hack due to debug bug
global.document = { documentElement: { style: { WebkitAppearance: true } } }

if (global.__DEV__) {
  Debug.enable('*')
}

function init (prefix) {
  prefix = prefix + ':'
  const debug = Debug(prefix).bind(null, '')

  debug.disable = Debug.disable.bind(null, prefix + '*')

  return debug
}

global.Debug = init
