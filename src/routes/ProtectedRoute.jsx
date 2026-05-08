import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser, userData } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userData && userData.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
