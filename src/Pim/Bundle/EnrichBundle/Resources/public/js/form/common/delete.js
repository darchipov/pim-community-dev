/**
 * Delete extension
 *
 * @author    Clement Gautier <clement.gautier@akeneo.com>
 * @copyright 2016 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
import _ from 'underscore'
import __ from 'oro/translator'
import BaseForm from 'pim/form'
import template from 'pim/template/form/delete'
import router from 'pim/router'
import LoadingMask from 'oro/loading-mask'
import messenger from 'oro/messenger'
import Dialog from 'pim/dialog'

export default BaseForm.extend({
  tagName: 'button',

  className: 'AknDropdown-menuLink delete',

  template: _.template(template),

  events: {
    'click': 'delete'
  },

  /**
   * The remover should be injected / overridden by the concrete implementation
   * It is an object that define a remove function
   */
  remover: {
    remove: function () {
      throw 'Remove function should be implemented in remover'
    }
  },

  /**
   * @param {Object} meta
   */
  initialize: function (meta) {
    this.config = _.extend({}, {
      trans: {
        title: 'confirmation.remove.item',
        content: 'pim_enrich.confirmation.delete_item',
        success: 'flash.item.removed',
        fail: 'error.removing.item'
      },
      redirect: 'oro_default'
    }, meta.config)
  },

  /**
   * {@inheritdoc}
   */
  render: function () {
    this.$el.html(this.template({
      '__': __
    }))
    this.delegateEvents()

    return this
  },

  /**
   * Open a dialog to ask the user to confirm the deletion
   */
  delete: function () {
    Dialog.confirm(
      __(this.config.trans.title),
      __(this.config.trans.content),
      this.doDelete.bind(this)
    )
  },

  /**
   * Send a request to the backend in order to delete the element
   */
  doDelete: function () {
    var config = this.config
    var loadingMask = new LoadingMask()
    loadingMask.render().$el.appendTo(this.getRoot().$el).show()

    this.remover.remove(this.getIdentifier())
      .done(function () {
        messenger.notify('success', __(this.config.trans.success))
        router.redirectToRoute(this.config.redirect)
      }.bind(this))
      .fail(function (xhr) {
        var message = xhr.responseJSON && xhr.responseJSON.message
          ? xhr.responseJSON.message : __(config.trans.failed)

        messenger.notify('error', message)
      })
      .always(function () {
        loadingMask.hide().$el.remove()
      })
  },

  /**
   * Get the current form identifier
   *
   * @return {String}
   */
  getIdentifier: function () {
    return this.getFormData().code
  }
})
