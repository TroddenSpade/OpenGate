#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    if ! [ -x "$(command -v npm)" ]; then
        curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
        sudo apt-get install -y nodejs
        sudo chown -R $USER /usr/lib/node_modules
    fi
    if ! [ -x "$(command -v openvpn)" ]; then
        sudo apt-get install openvpn
    fi
    if ! [ -x "$(command -v opengate)" ]; then
        sudo npm i -g opengate-cli
    fi
    echo "Run 'sudo opengate' Command"
elif [[ "$OSTYPE" == "darwin"* ]] ; then
    if ! [ -x "$(command -v npm)" ]; then
        echo "install node.js";
    fi
    if ! [ -x "$(command -v openvpn)" ]; then
        brew install openvpn
        sudo brew services start openvpn
        echo "export PATH=$PATH:/usr/local/opt/openvpn/sbin"
        exec $SHELL
    fi
    if ! [ -x "$(command -v opengate)" ]; then
        npm i -g opengate-cli
    fi
    echo "Run 'opengate' Command"
else
    echo "This OS is not Supported, Install it Manually"
fi
