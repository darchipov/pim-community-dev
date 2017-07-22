/**
 * @author    Yohan Blain <yohan.blain@akeneo.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
import _ from 'underscore'
import BaseController from 'pim/controller/base'
import FormBuilder from 'pim/form-builder'
import fetcherRegistry from 'pim/fetcher-registry'

export default BaseController.extend({
  /**
   * {@inheritdoc}
   */
  renderRoute: function () {
    if (!this.active) {
      return
    }

    fetcherRegistry.getFetcher('attribute-group').clear()
    fetcherRegistry.getFetcher('locale').clear()
    fetcherRegistry.getFetcher('measure').clear()

    var type = this.getQueryParam(location.href, 'attribute_type')

    var formName = type === 'pim_catalog_identifier'
      ? 'pim-attribute-identifier-create-form'
      : 'pim-attribute-create-form'

    return FormBuilder.buildForm(formName)
      .then(function (form) {
        form.setType(type)

        return form.configure().then(function () {
          return form
        })
      })
      .then(function (form) {
        this.on('pim:controller:can-leave', function (event) {
          form.trigger('pim_enrich:form:can-leave', event)
        })

        form.setData({
          code: '',
          labels: {},
          type: type,
          available_locales: []
        })

        form.setElement(this.$el).render()
      }.bind(this))
  },

  /**
   * Extracts the value of a given parameter from the query string.
   *
   * @param {String} url
   * @param {String} paramName
   *
   * @return  {String}
   */
  getQueryParam: function (url, paramName) {
    var params = url.substr(url.lastIndexOf('?') + 1)
    if (!params) {
      return null
    }

    var paramsList = params.split('=')
    if (!_.contains(paramsList, paramName)) {
      return null
    }

    return paramsList[paramsList.indexOf(paramName) + 1]
  }
})
