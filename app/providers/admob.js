import axios from 'axios'

import { admob } from './config'

export const deviceID = global.__DEV__ ? 'EMULATOR' : 'PRODUCTION'
export const adUnitID = admob.adUnitID
