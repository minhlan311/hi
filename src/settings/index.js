import devSettings from './dev'

// eslint-disable-next-line import/no-mutable-exports
let settings = {}
switch (process.env.NODE_ENV) {
    default:
        settings = devSettings
        break
}

export default settings
