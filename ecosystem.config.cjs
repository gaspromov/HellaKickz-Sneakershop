module.exports = {
  apps: [
    {
      name: 'hellakickz',
      script: './src/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['194.58.103.194'],
      ref: 'origin/master',
      repo: 'git@github.com:gaspromov/HellaKickz.git',
      path: '/var/www/hellakickz.ru',
      ssh_options: 'StrictHostKeyChecking=no',
      env: {
        NODE_ENV: 'production'
      },
      'post-deploy':
        'npm install && npm run client:install && npm run client:build && pm2 reload ecosystem.config.cjs --env production'
    }
  }
}
