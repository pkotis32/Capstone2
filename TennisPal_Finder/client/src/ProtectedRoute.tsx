import {ReactNode, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  currUser: string | null; // Replace `unknown` with your actual user type
  children: ReactNode;
}

// handles routes that need authorization, displays unauthorized message if user is not authorized for certain route
const ProtectedRoute = ({ currUser, children }: ProtectedRouteProps) => {
  
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay of 0.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);  // Set loading to false after 0.5 seconds
    }, 500);  // 500ms = 0.5 seconds

    return () => clearTimeout(timer);  // Cleanup timeout on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a custom loading spinner or component
  }

  
  return currUser ? children : <Navigate to="/" state={{error: "Unauthorized, please login/signup"}} />;
};

export default ProtectedRoute;