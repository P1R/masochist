/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE-fbjs file in this file's directory in the source tree. An additional
 * grant of patent rights can be found in the PATENTS-fbjs file in the same
 * directory.
 */

module.exports = function(babel) {
  var t = babel.types;

  var DEV_EXPRESSION = t.binaryExpression(
    '!==',
    t.memberExpression(
      t.memberExpression(
        t.identifier('process'),
        t.identifier('env'),
        false
      ),
      t.identifier('NODE_ENV'),
      false
    ),
    t.literal('production')
  );

  return new babel.Transformer('masochist.dev', {
    Identifier: {
      enter: function(node, parent) {
        // Do nothing when testing,
        if (process.env.NODE_ENV === 'test') {
          return undefined;
        }
        // Replace __DEV__ with process.env.NODE_ENV !== 'production'.
        if (this.isIdentifier({name: '__DEV__'})) {
          return DEV_EXPRESSION;
        }
      },
    },
  });
};