var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'pyturtle:plugin',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'pyturtle',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

