import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/app/page';
import NotFoundPage from '@/component/page/not_found';

function App() {
  return (
    <Router basename={`/${__PROJECT_BASENAME__}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
