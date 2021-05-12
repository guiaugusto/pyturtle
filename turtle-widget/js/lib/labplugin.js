var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'turtle-widget:plugin',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'turtle-widget',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

