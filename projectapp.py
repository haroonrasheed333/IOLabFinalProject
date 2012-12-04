#!/usr/bin/env python

import shelve
from subprocess import check_output
import flask
import atexit
from flask import request
from os import environ
import string

app = flask.Flask(__name__)
app.debug = True
db = shelve.open("blog.db")


@app.route('/')
def index():
    """Builds a template based on a GET request, with some default
    arguements"""
    return flask.render_template(
                'index.html')


@app.route("/comments", methods=['GET'])
def create():
    try:
        app.logger.debug("Entered POST")
        app.logger.debug("request.form==", request.form)
        app.logger.debug("request.args==", request.args)

        return flask.render_template(
                        'index.html',
                        message = mesg)
    except:
        import traceback
        traceback.print_exc()
        raise Exception('something is wrong')

def onexit():
    db.close()


if __name__ == "__main__":
    atexit.register(onexit)
    app.run(port=8888)

