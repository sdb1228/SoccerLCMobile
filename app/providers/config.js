import { Platform } from 'react-native'
import tempProvider from '../../config/temp-provider'
import admob from '../../config/admob-config'

const admobConfig = admob[Platform.OS]

export {
  tempProvider,
  admobConfig as admob,
}
