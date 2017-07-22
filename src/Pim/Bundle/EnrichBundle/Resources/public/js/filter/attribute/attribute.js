/**
 * Abstract attribute filter
 *
 * @author    Yohan Blain <yohan.blain@akeneo.com>
 * @copyright 2016 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */
import $ from 'jquery'
import _ from 'underscore'
import BaseFilter from 'pim/filter/filter'
import FetcherRegistry from 'pim/fetcher-registry'
import i18n from 'pim/i18n'
import UserContext from 'pim/user-context'
import ScopeSwitcher from 'pim/product-edit-form/scope-switcher'
import LocaleSwitcher from 'pim/product-edit-form/locale-switcher'

export default BaseFilter.extend({
  /**
   * {@inherit}
   */
  initialize: function (config) {
    if (undefined !== config) {
      this.config = config.config
    }

    return BaseFilter.prototype.initialize.apply(this, arguments)
  },

  /**
   * Sets the scope code on which this filter operates.
   *
   * @param {string} scope
   * @param {Object} options
   */
  setScope: function (scope, options) {
    var context = this.getFormData().context || {}
    context.scope = scope

    this.setData({
      context: context
    }, options)
  },

  /**
   * Gets the scope code on which this filter operates.
   *
   * @return {string}
   */
  getScope: function () {
    if (undefined === this.getFormData().context) {
      return null
    }

    return this.getFormData().context.scope
  },

  /**
   * Sets the locale code on which this filter operates.
   *
   * @param {string} locale
   * @param {Object} options
   */
  setLocale: function (locale, options) {
    var context = this.getFormData().context || {}
    context.locale = locale

    this.setData({
      context: context
    }, options)
  },

  /**
   * Gets the locale code on which this filter operates.
   *
   * @return {string}
   */
  getLocale: function () {
    if (undefined === this.getFormData().context) {
      return null
    }

    return this.getFormData().context.locale
  },

  /**
   * {@inheritdoc}
   */
  renderElements: function () {
    FetcherRegistry.getFetcher('attribute')
      .fetch(this.getCode())
      .then(function (attribute) {
        if (this.isEditable()) {
          this.addContextDropdowns(attribute)
        } else {
          this.addContextLabels(attribute)
        }
      }.bind(this))
      .then(function () {
        BaseFilter.prototype.renderElements.apply(this, arguments)
      }.bind(this))
  },

  /**
   * Adds the context dropdown to the filter in edit mode according to attribute information.
   *
   * @param {Object} attribute
   */
  addContextDropdowns: function (attribute) {
    var container = $('<span class="AknFieldContainer-contextContainer filter-context">')

    if (attribute.scopable) {
      var scopeSwitcher = new ScopeSwitcher()
      scopeSwitcher.setDisplayInline(true)

      this.listenTo(scopeSwitcher, 'pim_enrich:form:scope_switcher:pre_render', this.initScope.bind(this))

      this.listenTo(
        scopeSwitcher,
        'pim_enrich:form:scope_switcher:change',
        function (scopeEvent) {
          if (scopeEvent.context === 'base_product') {
            this.setScope(scopeEvent.scopeCode, {
              silent: true
            })
            this.trigger('pim_enrich:form:entity:post_update')
          }
        }.bind(this)
      )

      container.append(scopeSwitcher.render().$el)
    }

    if (attribute.localizable) {
      var localeSwitcher = new LocaleSwitcher()
      localeSwitcher.setDisplayInline(true)

      this.listenTo(localeSwitcher, 'pim_enrich:form:locale_switcher:pre_render', this.initLocale.bind(this))

      this.listenTo(
        localeSwitcher,
        'pim_enrich:form:locale_switcher:change',
        function (localeEvent) {
          if (localeEvent.context === 'base_product') {
            this.setLocale(localeEvent.localeCode, {
              silent: true
            })
            this.trigger('pim_enrich:form:entity:post_update')
          }
        }.bind(this)
      )

      container.append(localeSwitcher.render().$el)
    }

    this.addElement(
      'after-input',
      'filter-context',
      container
    )
  },

  /**
   * {@inheritdoc}
   */
  getTemplateContext: function () {
    return $.when(
      BaseFilter.prototype.getTemplateContext.apply(this, arguments),
      FetcherRegistry.getFetcher('attribute').fetch(this.getCode())
    ).then(function (templateContext, attribute) {
      return _.extend({}, templateContext, {
        label: i18n.getLabel(attribute.labels, UserContext.get('uiLocale'), attribute.code),
        attribute: attribute
      })
    })
  },

  /**
   * Adds the context labels to the filter in view mode according to attribute information.
   *
   * @param {Object} attribute
   */
  addContextLabels: function (attribute) {
    var promises = []

    if (attribute.scopable && this.getScope()) {
      promises.push(FetcherRegistry.getFetcher('channel')
        .fetch(this.getScope())
        .then(function (channel) {
          return $('<span>').html(channel.label)
        })
      )
    }

    if (attribute.localizable && this.getLocale()) {
      promises.push(
        $.Deferred()
          .resolve($('<span>').html(i18n.getFlag(this.getLocale())))
          .promise()
      )
    }

    $.when.apply($, promises)
      .then(function () {
        var container = $('<span class="filter-context">')
        _.each(_.toArray(arguments), function (item) {
          container.append(item)
        })

        this.addElement(
          'after-input',
          'filter-context',
          container
        )
      }.bind(this))
  },

  /**
   * Initialize the scope
   *
   * @param {Object} scopeEvent
   * @param {string} scopeEvent.context
   * @param {string} scopeEvent.scopeCode
   */
  initScope: function (scopeEvent) {
    if (this.getScope()) {
      scopeEvent.scopeCode = this.getScope()
    } else {
      this.setScope(scopeEvent.scopeCode, {
        silent: true
      })
    }
  },

  /**
   * Initialize the locale
   *
   * @param {Object} localeEvent
   * @param {string} localeEvent.context
   * @param {string} localeEvent.localeCode
   */
  initLocale: function (localeEvent) {
    if (this.getLocale()) {
      localeEvent.localeCode = this.getLocale()
    } else {
      this.setLocale(localeEvent.localeCode, {
        silent: true
      })
    }
  }
})
