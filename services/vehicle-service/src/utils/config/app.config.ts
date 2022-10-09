export const AppConfig = {
  env: process.env.NODE_ENV,
  port: ~~(process.env.APP_PORT ?? 4000),

  isInDevelopment(): boolean
  {
    return this.env === 'development';
  },
  isInProduction(): boolean
  {
    return this.env === 'production';
  }
};
