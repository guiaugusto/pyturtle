import ipywidgets as widgets
from traitlets import Unicode, List

# See js/lib/example.js for the frontend counterpart to this file.

@widgets.register
class Turtle(widgets.DOMWidget):
    """An example widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('TurtleView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('TurtleModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('turtle-widget').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('turtle-widget').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    _command_list = List([]).tag(sync=True)

