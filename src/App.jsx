import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';

import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      {/* Using HashRouter for GitHub Pages compatibility */}
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
