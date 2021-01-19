import configureStoreProd from './configureStore.prod'
import configureStoreDev from './configureStore.dev'

export default (process.env.NODE_ENV === 'production')
  ? configureStoreProd
  : configureStoreDev