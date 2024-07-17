import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './index.css'
// import './App.css'
import './assets/style/main.css'

import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

export function App() {

  return <Provider store={store}>
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/toy" element={<ToyIndex />} />
        <Route path="/toy/edit" element={<ToyEdit />} />
        <Route path="/toy/edit/:id" element={<ToyEdit />} />
      </Routes>
    </Router>
  </Provider>
}


