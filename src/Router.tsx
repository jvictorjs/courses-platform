import { Route, Routes } from 'react-router-dom'
import { Course } from './pages/Course'
import { Subscribe } from './pages/Subscribe'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Subscribe />} />
            <Route path='/content' element={<Course />} />
            <Route path='/content/lesson/:slug' element={<Course />} />
        </Routes>
    )
}