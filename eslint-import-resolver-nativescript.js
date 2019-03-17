var path = require('path')
  , resolver = require('eslint-import-resolver-webpack');

exports.interfaceVersion = 2;

/**
 * The resolver for eslint-plugin-import.
 *
 * Since the folder struction of package `tns-core-modules` is different to regular node package,
 * it could not be solved correctly.
 * The `main` property of `package.json` under `tns-core-modules/{{ PACKAGE }}` dosen't point to a valid file,
 * so the default node resolver and webpack resolver cannot find the desired import file.
 * This nativescript resolver resolve the problem by append `package.json` to the tail of import path,
 * therefore it will be a valid path.
 * @param {string} source
 * @param {string} file
 * @param {object} config
 * @return {object} result object like { found: true }, or { found: true, path: null }
 *     for more information, see: https://github.com/benmosher/eslint-plugin-import/tree/v2.16.0/resolvers
 */
exports.resolve = function(source, file, config) {
  const dir = path.dirname(source);
  const ext = path.extname(source);
  // Add extension '.d.ts' to the end of path when the pattern of the path
  // contains 'tns-core-modules' and end without extension
  //
  // This strategy will not work when you add a alias to 'tns-core-modules'
  // since the alias resolution is after this path replacement
  const modSource = dir.includes('tns-core-modules') && ext === '' ?
    path.join(source, 'package.json') : source;

  // Transparently pass file and config to webpack resolver
  return resolver.resolve(modSource, file, config);
}
