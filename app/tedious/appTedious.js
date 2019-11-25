const config = require('./config');
const DatabaseUtils = require('./DatabaseUtils');
const databaseUtils = new DatabaseUtils(config);

const passing = async (connection, index) => {
  return new Promise(async (resolve, reject) => {
    try {
      await test2();
      resolve();
    } catch(err) {
      console.log(err, 'from passing');
      reject(err);
    }
  })
};

const test2 = () => {
  return new Promise((resolve, reject) => {
    reject('testerro');
  })
};

async function test() {
  const parents = [1,2,3];
  const indexs = [1,2,3,4,5,6,7,8];

  try {
    // const connection = await databaseUtils.createConnection();
    // const result = await databaseUtils.executeRequest(connection, 1);
    const result = await passing();
    console.log(result);
  } catch(err) {
    console.log(err);
  }

  // for(index of indexs) {
  //   const connection = await createConnectionPromise();
  //   console.log(connection);
  //   const result = await executeRequestPromise(connection, index);
  //   console.log(result);
  // }
}
test();
