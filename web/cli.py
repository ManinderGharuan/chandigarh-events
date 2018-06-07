from flask_script import Manager
import os
from . import app

cli = Manager(app)


@cli.command
def web():
    """Run the web server"""
    port = int(os.environ.get('PORT', 5000))

    debug = False if os.environ.get('FLASK_PROD') else True

    app.run(host='0.0.0.0', debug=debug, port=port)
