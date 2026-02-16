import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'

import './styles/index.css'

import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Tools from './pages/Tools'
import NotFound from './pages/NotFound'
import ErrorPage from './pages/ErrorPage'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
