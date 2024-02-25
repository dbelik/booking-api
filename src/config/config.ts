export default () => ({
  port: Number.parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number.parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'local',
    password: process.env.DATABASE_PASSWORD || 'local',
    database: process.env.DATABASE_NAME || 'booking',
    synchronize: process.env.DATABASE_SYNCHRONIZE
      ? process.env.DATABASE_SYNCHRONIZE === 'true'
      : true,
  },
  import: {
    maxFileSize:
      Number.parseInt(process.env.IMPORT_MAX_FILESIZE, 10) || 4 * 1024 * 1024,
  },
  auth: {
    salt: Number.parseInt(process.env.AUTH_SALT, 10) || 10,
    cookie: {
      secret: process.env.AUTH_COOKIE_SECRET || 'secret',
      ttl: Number.parseInt(process.env.AUTH_COOKIE_TTL, 10) || 3_600_000,
      name: 'auth_token',
    },
  },
});
