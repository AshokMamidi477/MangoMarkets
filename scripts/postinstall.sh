#!/bin/bash
# Fix for spaces in directory paths breaking Xcode build phases
# Patches react-native's script_phases.rb, with-environment.sh, and react-native-xcode.sh

SCRIPT_PHASES="node_modules/react-native/scripts/react_native_pods_utils/script_phases.rb"
WITH_ENV="node_modules/react-native/scripts/xcode/with-environment.sh"
RN_XCODE="node_modules/react-native/scripts/react-native-xcode.sh"

if [ -f "$SCRIPT_PHASES" ]; then
  sed -i '' 's|/bin/sh -c "$WITH_ENVIRONMENT $SCRIPT_PHASES_SCRIPT"|source "$WITH_ENVIRONMENT"\n        /bin/sh "$SCRIPT_PHASES_SCRIPT"|g' "$SCRIPT_PHASES"
  echo "Patched $SCRIPT_PHASES for spaces in paths"
fi

if [ -f "$WITH_ENV" ]; then
  sed -i '' 's|^  \$1$|  "$1"|' "$WITH_ENV"
  echo "Patched $WITH_ENV for spaces in paths"
fi

# Fix --config-cmd quoting in react-native-xcode.sh for paths with spaces
if [ -f "$RN_XCODE" ]; then
  sed -i '' 's|"--config-cmd" "$NODE_BINARY $NODE_ARGS $REACT_NATIVE_DIR/cli.js config"|"--config-cmd" "\\\"$NODE_BINARY\\\" $NODE_ARGS \\\"$REACT_NATIVE_DIR/cli.js\\\" config"|' "$RN_XCODE"
  echo "Patched $RN_XCODE for spaces in paths"
fi
