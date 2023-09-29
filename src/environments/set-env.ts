const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const colors = require('colors');
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
        appId: '${process.env['MONGO.REALM.APP_ID']}'
      }
    },
    appVersion: '${appVersion}'
  };`;

  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));

  writeFile(targetPath, envConfigFile, (err: object) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

setEnv();
