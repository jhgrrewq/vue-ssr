const { spawn } = require('child_process')
const dev = spawn('npm', ['run', 'dev:client'], { shell: true, env: process.env, stdio: 'inherit' })
  .on('close', code => process.exit(code))
  .on('error', spawnError => console.error(spawnError))
const serve = spawn('npm', ['run', 'dev:server'], { shell: true, env: process.env, stdio: 'inherit' })
  .on('close', code => process.exit(code))
  .on('error', spawnError => console.error(spawnError))

function exitHandler (options, code, err) {
  console.log(`退出码: ${code}`)
  dev.kill()
  serve.kill()

  if (options.cleanup) console.log('clean')
  if (err) console.log(err.stack)
  if (options.exit) process.exit()
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}))
// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}))
// catches kill event
// process.on('SIGKILL', exitHandler.bind(null, {exit:true}));
// catches SIGUSR1 event
process.on('SIGUSR1', exitHandler.bind(null, {
  exit: true
}))
// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}))
