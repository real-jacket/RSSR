/**
 * 删除代码中导入的 css
 */

module.exports = function ({ types: babelTypes }) {
  return {
    name: 'no-require-css',
    visitor: {
      ImportDeclaration(path, state) {
        let importFile = path.node.source.value;
        if (importFile.indexOf('.scss') > -1) {
          path.remove();
        }
      },
    },
  };
};
