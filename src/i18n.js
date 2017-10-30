const i18nStrings = require.context(".", true, /\/strings.json$/)
const en_us = Object.assign({}, ...i18nStrings.keys().map(i18nStrings))
export { en_us }
