from ._version import version_info, __version__

from .example import *


def _jupyter_labextension_paths():
    return [{
        'src': 'labextension',
        'dest': 'pyturtle',
    }]


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension',
        'dest': 'pyturtle',
        'require': 'pyturtle/extension'
    }]
