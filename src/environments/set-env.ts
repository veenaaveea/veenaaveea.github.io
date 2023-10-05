const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env'
  });

  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    production: false,
    mongo: {
      realm: {
        appId: "${process.env['MONGO.REALM.APP_ID']}",
        apiKeys: {
          anonymous: "${process.env['MONGO.REALM.API_KEYS.ANONYMOUS']}"
        }
      },
      graphqlUrl: "${process.env['MONGO.GRAPHQL_URL']}"
    },
    appVersion: '${appVersion}'
  };`;

  console.log('The file `environment.ts` will be written with the following content: \n');

  writeFile(targetPath, envConfigFile, (err: object) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
