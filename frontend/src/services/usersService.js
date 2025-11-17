import usersData from "../Data/users.json";

export const usersService = {
  getAll: () => {
    return usersData;
  },

  login: (email, password) => {
    const user = usersData.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    }

    return user || null;
  },

  register: (name, email, password, role) => {
    const exists = usersData.find((u) => u.email === email);
    if (exists) {
      return { error: "Email already exists" };
    }

    const newUser = {
      id: usersData.length + 1,
      name,
      email,
      password,
      role,
    };

    usersData.push(newUser);

    // שמירת משתמש מחובר אוטומטית
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    return newUser;
  },

  getLoggedUser: () => {
    return JSON.parse(localStorage.getItem("loggedUser"));
  },

  logout: () => {
    localStorage.removeItem("loggedUser");
  },
};
