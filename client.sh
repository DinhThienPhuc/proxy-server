#!/bin/bash

HEADER="Host:leviathan.vn"
PATH=""
PORT="3000"

# $1 is flow name. Example: basic, cache, filter, ddos
# $2 is path
if [ $1 == "basic" ]; then
    PORT=7000
    PATH=$2
fi

if [ $1 == "cache" ]; then
    PORT=7000
    PATH="cache/$2"
fi

if [ $1 == "filter" ]; then
    PORT=7100
    PATH=$2
fi

if [ $1 == "ddos" ]; then
    PORT=7200
    PATH=$2
fi

command="/usr/bin/curl http://127.0.0.1:$PORT/$PATH -H $HEADER"
echo $($command)
