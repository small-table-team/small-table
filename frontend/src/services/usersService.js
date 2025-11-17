import usersData from "../Data/users.json";

export const usersService = {

  // טעינת כל המשתמשים מתוך localStorage או מה־JSON אם זו הפעלה ראשונה
  getAll: () => {
    const stored = JSON.parse(localStorage.getItem("users"));
    return stored || usersData;
  },

  // שמירה חזרה ל-localStorage
  saveAll: (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  },

  login: (email, password) => {
    const users = usersService.getAll();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    }

    return user || null;
  },

  register: (name, email, password, role) => {
    const users = usersService.getAll();

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { error: "Email already exists" };
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role,
      status: "active"   // אם תרצי לשנות תגידי
    };

    users.push(newUser);

    // שמירת המשתמשים המעודכנים
    usersService.saveAll(users);

    // שמירת המשתמש שנרשם כ־logged in
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
