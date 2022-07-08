module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8a0d60e25e9cf8c258c19464a6835e40'),
  },
});
