import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

// Create a new context for authentication
const AuthContext = createContext(null);

// The AuthProvider component — wraps your app and provides auth data
export const AuthProvider = ({ children }) => {

  // React state to store the currently logged-in user
  const [user, setUser] = useState(undefined);


  // useEffect runs once when the component mounts
  useEffect(() => {
    // Function to initialize the current session
    const init = async () => {

      // Get the current session from Supabase
      const { data } = await supabase.auth.getSession();
      // If a session exists, set the user; otherwise, set null
      setUser(data?.session?.user || null);
    };

    // Run the init function
    init();

    // Set up a listener for auth state changes (login, logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Update the user when the session changes
      setUser(session?.user || null);
    });

    // Cleanup: unsubscribe from the listener when the component unmounts
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  // Provide the user state to all child components
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the AuthContext
export const useAuth = () => useContext(AuthContext);