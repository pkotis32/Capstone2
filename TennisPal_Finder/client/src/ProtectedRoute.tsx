import {ReactNode, useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  currUser: string | null; // Replace `unknown` with your actual user type
  children: ReactNode;
}

// handles routes that need authorization, displays unauthorized message if user is not authorized for certain route
const ProtectedRoute = ({ currUser, children }: ProtectedRouteProps) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Hide the spinner after 0.5 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 50); // 3 seconds timeout

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (showLoading) {
    return <div>Loading...</div>; 
  }
  return currUser ? children : <Navigate to="/" state={{error: "Unauthorized, please login/signup"}} />;
};

export default ProtectedRoute;