#!/bin/bash

CURRENT_DIR="$(dirname "${BASH_SOURCE[0]}")"
cd $CURRENT_DIR/src;

if [ -z "`which python`" ]; then
    echo "Error: You must have Python installed to launch this project's' webserver";
    exit 1;
fi

openBrowser() {
    sleep 1;
    open -a 'Google Chrome' "http://localhost:8000/"
}

# Chrome's Voice API only works on pages served over HTTP. Launch simple webserver for project.
openBrowser & 
python -m SimpleHTTPServer;
