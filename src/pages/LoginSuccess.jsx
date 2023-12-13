import { useEffect } from 'react';

function LoginSuccessPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", user);

      // Update your application state as necessary
      // For example, using a context or Redux action to set the user state
      // dispatch(setUser(JSON.parse(user)));
    }

    // Redirect to home page or dashboard after successful login
    window.location.href = '/';
  }, []);

  // Render a loading message or similar
  return <div>Loading...</div>;
}


export default LoginSuccessPage