import ipywidgets as widgets
from traitlets import Unicode, Dict, observe

# See js/lib/example.js for the frontend counterpart to this file.

@widgets.register
class Turtle(widgets.DOMWidget):
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

    command = Dict({ 'function_name': 'idle', 'args': [] }).tag(sync=True)
    canvas = Dict({ 'element': None })
    turtle = Dict({ 'element': None })

    def forward(self, distance):
        self.command = { 'function_name': 'forward', 'args': [distance] }

    def backward(self, distance):
        self.forward(distance*-1)

    def right(self, angle):
        self.command = { 'function_name': 'right', 'args': [angle] }

    def left(self, angle):
        self.command = { 'function_name': 'left', 'args': [angle] }

    def color(self, color):
        self.command = { 'function_name': 'setLineColor', 'args': [color] }

    def circle(self, radius):
        self.command = { 'function_name': 'circle', 'args': [radius] }

    def rectangle(self, width, height):
        self.command = { 'function_name': 'rectangle', 'args': [width, height] }

    def speed(self, value):
        self.command = { 'function_name': 'speed', 'args': [value] }

    def set_position(self, x, y):
        self.command = { 'function_name': 'setPosition', 'args': [x, y] }

    @observe('command')
    def reset_command(self, args):
        self.command = {}
