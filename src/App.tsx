import "src/style/global.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from 'src/routes/routes';
import ProtectedRoute from 'src/utils/ProtectedRoute';
import Layout from 'src/layout/layout.jsx';

const isAuthenticated = localStorage.getItem("accessToken");

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute isAuth={typeof isAuthenticated === 'string' && isAuthenticated?.length > 0}>
                    {route.element}
                  </ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
