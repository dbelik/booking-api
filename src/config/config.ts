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
});
