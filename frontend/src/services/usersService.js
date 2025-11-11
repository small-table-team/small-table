import usersData from "../Data/users.json";

export const usersService = {
  getAll: () => {
    console.log("All users:", usersData); // מציג כל המשתמשים
    return usersData;
  },

  login: (email, password) => {
    const user = usersData.find(
      (u) => u.email === email && u.password === password
    );
    console.log(`Login attempt for ${email}:`, usersData); // מציג את כל המשתמשים בכל ניסיון התחברות
    return user || null;
  },

  register: (name, email, password) => {
    const exists = usersData.find((u) => u.email === email);
    if (exists) {
      console.log(`Register attempt failed for ${email}: Email exists`);
      console.log("Current users:", usersData); // מציג את כל המשתמשים
      return { error: "Email already exists" };
    }

    const newUser = {
      id: usersData.length + 1,
      name,
      email,
      password,
    };

    usersData.push(newUser);
    console.log(`New user added: ${email}`);
    console.log("Current users:", usersData); // מציג את כל המשתמשים לאחר ההוספה
    return newUser;
  },
};
