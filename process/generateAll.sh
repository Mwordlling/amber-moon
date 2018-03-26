#!/usr/bin/env bash

# Повинен бути встановлений d3 (локально в директорію)
# npm install --save d3

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cat $DIR/../coordinates.csv | node $DIR/toSquares.js 1 > $DIR/../data/squares.1.geojson
cat $DIR/../coordinates.csv | node $DIR/toSquares.js 9 > $DIR/../data/squares.9.geojson
