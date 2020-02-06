var fs = require('fs');
var fse = require('fs-extra');

var { BASE_DIR, AUTH_DIR, AXIOS_DIR, DIST_DIR } = require('./constants');

async function cli(argv) {
  await createFolder();
  await copyBaseFolder();
  
  Promise.all([copyAuth0(), copyAxios()])
    .then(values => {
    })
    .catch(error => {
      console.error('ERROR :: PromiseAll ',error)
    })

  addDependencies();
  
}

const createFolder = async function () {
  if (fs.existsSync(DIST_DIR)) {
    await remove(DIST_DIR);
  } else {
    await create(DIST_DIR);
  }
}

const copyBaseFolder = function () {
  move(BASE_DIR, DIST_DIR)
}

const copyAuth0 = async function() {
  try {
    await create(`${DIST_DIR}/src/auth`);
    await fse.copy(`${AUTH_DIR}/auth.js`, `${DIST_DIR}/src/auth/index.js`)
  } catch (err) {
    console.error(err)
  }
}

const copyAxios = async function() {
  try {
    await create(`${DIST_DIR}/src/axios`);
    await fse.copy(`${AXIOS_DIR}/axios.js`, `${DIST_DIR}/src/axios/index.js`);
  } catch (err) {
    console.error(err)
  }}

async function move (src, dest) {
  try {
    await fse.copySync(src, dest)
  } catch (err) {
    console.error('COPY Error :: ',err)
  }
}

async function remove (path) {
  try {
    await fse.remove(path)
  } catch (err) {
    console.error('REMOVE :: ',err)
  }
}

async function create (directory) {
  try {
    await fse.ensureDir(directory)
  } catch (err) {
    console.error('CREATE :: ', err)
  }
}

const addDependencies = async () => {  
  const basePackageData = await getPackageDependencies(`${BASE_DIR}/package.json`);
  const auth0PackageData = await getPackageDependencies(`${AUTH_DIR}/package.json`);
  const axiosPackageData = await getPackageDependencies(`${AXIOS_DIR}/package.json`);

  let moduleDdependencies = {}

  for (let [key, value] of Object.entries(auth0PackageData.dependencies)) {
    moduleDdependencies[key] = value
  }

  for (let [key, value] of Object.entries(axiosPackageData.dependencies)) {
    moduleDdependencies[key] = value
  }

  const dependencies = {...basePackageData.dependencies, ...moduleDdependencies}
  basePackageData.dependencies = dependencies;

  createDependenciesPackage(basePackageData)
 
}

const getPackageDependencies = (packagePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(packagePath, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  })
}

const createDependenciesPackage = (dependencies) => {
  let data = JSON.stringify(dependencies, null, 2);
  return new Promise((resolve, reject) => {
    fs.writeFileSync(`${DIST_DIR}/package.json`, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  })
}

module.exports = cli;