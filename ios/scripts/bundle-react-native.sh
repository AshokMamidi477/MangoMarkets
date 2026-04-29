#!/bin/bash
set -e

# Source environment
if [[ -s "${PODS_ROOT}/../.xcode.env" ]]; then
  source "${PODS_ROOT}/../.xcode.env"
fi
if [[ -s "${PODS_ROOT}/../.xcode.env.local" ]]; then
  source "${PODS_ROOT}/../.xcode.env.local"
fi

if [ -z "$NODE_BINARY" ]; then
  NODE_BINARY=$(command -v node)
fi

export RCT_METRO_PORT="${RCT_METRO_PORT:=8081}"

REACT_NATIVE_XCODE="$("$NODE_BINARY" --print "require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-xcode.sh'")"

/bin/sh "$REACT_NATIVE_XCODE"
