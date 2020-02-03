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
      console.log('Copy successfull.')
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

const copyAuth0 = function() {
  move(authDir, distDir)
}

const copyAxios = function() {
  move(axiosDir, distDir)
}

async function move (src, dest) {
  try {
    await fse.move(src, dest)
    console.log('success!')
  } catch (err) {
    console.error('MOVE :: ',err)
  }
}

async function remove (path) {
  try {
    await fse.remove(path)
    console.log('success!')
  } catch (err) {
    console.error('remove :: ',err)
  }
}

async function create (directory) {
  try {
    await fse.ensureDir(directory)
    console.log('success!')
  } catch (err) {
    console.error('CREATE :: ', err)
  }
}

module.exports = cli;