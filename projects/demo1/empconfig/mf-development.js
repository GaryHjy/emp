module.exports = {
  name: 'demo1',
  filename: 'emp.js',
  remotes: {
    '@emp/demo2': 'demo2@http://localhost:8002/emp.js',
  },
  exposes: {
    './configs/index': 'src/configs/index',
    './components/Demo': 'src/components/Demo',
    './components/Hello': 'src/components/Hello',
  },
  shared: ['react', 'react-dom'],
}
