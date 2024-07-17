import { Provider } from 'react-redux'



import './index.css'
import './App.css'
import { store } from './store/store.js'

export function App() {

  return <Provider store={store}>
    <h2>Mister Toy</h2>
  </Provider>

}


