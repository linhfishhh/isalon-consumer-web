module.exports = {
  apps: [
    {
      script: 'npm run start:prod',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'isalon.vn',
      ref: 'origin/master',
      repo:
        'git@gitlab.com:stgsolution/products/web-apps/isalon/isalon-consumer-web.git',
      path: '/var/www/isalon-consumer-web',
      'pre-setup':
        'sudo apt-get -y install git; sudo apt-get -y install npm; sudo npm install -g pm2',
      'pre-deploy-local': 'echo "This is a local executed command"',
      'post-setup': 'ls -la',
      'post-deploy':
        'npm install && npm run build:prod && pm2 reload ecosystem.config.js --env production',
      ssh_options: 'StrictHostKeyChecking=no',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
