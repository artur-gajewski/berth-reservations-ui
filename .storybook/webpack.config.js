const path = require('path');

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.(scss|css)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../src')
  });

  storybookBaseConfig.module.rules.push({
    test: /\.(png|svg|jpg|gif)$/,
    use: ['file-loader']
  });

  storybookBaseConfig.node = {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  };

  return storybookBaseConfig;
};
