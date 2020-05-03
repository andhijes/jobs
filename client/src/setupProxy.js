const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user/signin',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      secure:false,
    //   changeOrigin: true,
    })
  );

  app.use(
    '/positions.json?',
    createProxyMiddleware({
      target: 'https://jobs.github.com',
      secure:false,
      changeOrigin: true,
    })
  );

  app.use(
    '/positions/*.json',
    createProxyMiddleware({
      target: 'https://jobs.github.com',
      secure:false,
      changeOrigin: true,
    })
  );
};