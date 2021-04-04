module.exports = {
  apps: [
    {
      name: 'ghost-frontend',
      script: 'PORT=8000 ./node_modules/.bin/react-scripts start',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
