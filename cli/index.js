var fs = require('fs');
var fse = require('fs-extra');

var distDir = '../dist';
var baseDir = '../apps/base';
var authDir = '../modules/auth0';
var axiosDir = '../modules/axios'

async function cli(argv) {
  await createFolder();
  await copyBaseFolder();
  
  Promise.all([copyAuth0(), copyAxios()])
    .then(values => {
      console.log('COPY auth0, axios successfull.')
    })
    .catch(error => {
      console.error('COPY auth0, axios :: ',error)
    })

}

const createFolder = async function () {
  if (fs.existsSync(distDir)) {
    await remove(distDir);
  } else {
    await create(distDir);
  }
}

const copyBaseFolder = function () {
  move(baseDir, distDir)
}

const copyAuth0 = async function() {
  try {
    await create('../dist/src/auth');
    await fse.copy('../modules/auth0/auth.js', '../dist/src/auth/index.js')
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

const copyAxios = async function() {
  try {
    await create('../dist/src/axios');
    await fse.copy('../modules/axios/axios.js', '../dist/src/axios/index.js');
    console.log('success!')
  } catch (err) {
    console.error(err)
  }}

async function move (src, dest) {
  try {
    await fse.copySync(src, dest)
    console.log('COPY :: success!')
  } catch (err) {
    console.error('COPY Error :: ',err)
  }
}

async function remove (path) {
  try {
    await fse.remove(path)
    console.log('REMOVE :: success!')
  } catch (err) {
    console.error('REMOVE :: ',err)
  }
}

async function create (directory) {
  try {
    await fse.ensureDir(directory)
    console.log('CREATE :: success!')
  } catch (err) {
    console.error('CREATE :: ', err)
  }
}

module.exports = cli;