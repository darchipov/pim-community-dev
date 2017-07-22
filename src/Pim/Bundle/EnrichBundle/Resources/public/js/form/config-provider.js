import $ from 'jquery'
import Routing from 'routing'

var promise = null

var loadConfig = function () {
  if (promise === null) {
    promise = $.getJSON(Routing.generate('pim_enrich_form_extension_rest_index')).promise()
  }

  return promise
}

export default {
  /**
   * Returns configuration for extensions.
   *
   * @return {Promise}
   */
  getExtensionMap: function () {
    return loadConfig().then(function (config) {
      return config.extensions
    })
  },

  /**
   * Returns configuration for attribute fields.
   *
   * @return {Promise}
   */
  getAttributeFields: function () {
    return loadConfig().then(function (config) {
      return config.attribute_fields
    })
  },

  /**
   * Clear cache of form registry
   */
  clear: function () {
    promise = null
  }
}
