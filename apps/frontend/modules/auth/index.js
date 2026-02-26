const BASE_URL = "http://localhost:3000/auth";

// SIGNIN
export const signin = async ({ email, pass }) => {
  const resp = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: pass,
    }),
  });

  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || "Signin failed");
  }

  return resp.json();
};

// SIGNUP
export const signup = async ({ email, password }) => {
  const resp = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || "Signup failed");
  }

  return resp.json();
};
