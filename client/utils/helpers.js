export const camelToSnake = (data, depth) => {
  if (_.isObject(data)) {
    if (typeof depth === 'undefined') {
      depth = 1
    }
    return _processKeys(data, _snakelize, depth)
  } else {
    return _snakelize(data)
  }
}
export const fromSnakeToCamel = (data) => {
  if (_.isArray(data)) {
    return _.map(data, fromSnakeToCamel)
  }

  if (_.isObject(data)) {
    return (
      _(data)
        .mapKeys((v, k) => _.camelCase(k))
        // eslint-disable-next-line no-unused-vars
        .mapValues((v, k) => fromSnakeToCamel(v))
        .value()
    )
  }

  return data
}
export const convertToKebabCase = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase()
}
export const toCamelCase = (str) => {
  return str
    .split('-')
    .map(function (word, index) {
      // If it is the first word make sure to lowercase all the chars.
      // eslint-disable-next-line eqeqeq
      if (index === 0) {
        return word.toLowerCase()
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

// camelize/snakelize keys of an object
// @param {number} depth to which level of keys should it process
function _processKeys(obj, processer, depth) {
  if (depth === 0 || !_.isObject(obj)) {
    return obj
  }

  const result = {}
  const keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i++) {
    result[processer(keys[i])] = _processKeys(
      obj[keys[i]],
      processer,
      depth - 1
    )
  }

  return result
}

// snakelize a string formed in underscore
function _snakelize(key) {
  const separator = '_'
  const split = /(?=[A-Z])/

  return key.split(split).join(separator).toLowerCase()
}
