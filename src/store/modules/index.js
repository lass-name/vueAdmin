// import gank from './gank'

// const modules = {gank}
// console.log(modules)

// export default modules

let modules = {}
const requireModule = require.context('.', false, /\.js$/)
requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return
  let moduleName = fileName.replace(/\.\/|\.js/g, '')
  // console.log(moduleName)
  modules[moduleName] = { ...requireModule(fileName).default }
})
// console.log(modules)
// console.dir(modules)

export default modules
