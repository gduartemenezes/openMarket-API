module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5437',
  username: 'postgres',
  password: 'docker',
  database: 'openDev',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
