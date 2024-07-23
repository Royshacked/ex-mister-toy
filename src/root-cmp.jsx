import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './index.css'
// import './App.css'
import './assets/style/main.css'

import { store } from './store/store.js'

import { ToyIndex } from './pages/ToyIndex.jsx'
import { About } from './pages/About.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {

  return <Provider store={store}>
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/toy" element={<ToyIndex />} />
        <Route path="/toy/edit" element={<ToyEdit />} />
        <Route path="/toy/edit/:id" element={<ToyEdit />} />
        <Route path="/toy/:id" element={<ToyDetails />} />
      </Routes>
    </Router>
    <UserMsg />
  </Provider>
}


