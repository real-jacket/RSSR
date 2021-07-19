module.exports = {
  __IS_SSR__: JSON.parse(process.env.IS_SSR || 'false'),
  wdsPort: 9002,
  nodeServerPort: 9001,
};
