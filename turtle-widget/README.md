turtle-widget
===============================

A Jupyter Widget Library to simulate Logo language in python environment

Installation
------------

To install use pip:

    $ pip install turtle_widget

For a development installation (requires [Node.js](https://nodejs.org) and [Yarn version 1](https://classic.yarnpkg.com/)),

    $ git clone https://github.com//turtle-widget.git
    $ cd turtle-widget
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --overwrite --sys-prefix turtle_widget
    $ jupyter nbextension enable --py --sys-prefix turtle_widget

When actively developing your extension for JupyterLab, run the command:

    $ jupyter labextension develop --overwrite turtle_widget

Then you need to rebuild the JS when you make a code change:

    $ cd js
    $ yarn run build

You then need to refresh the JupyterLab page when your javascript changes.
