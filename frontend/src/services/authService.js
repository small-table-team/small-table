// src/services/authService.js
export async function loginUser(email, password) {
    try {
      // טוען את הנתונים מהקובץ JSON (שנמצא בתיקייה public)
      const response = await fetch("/data/users.json");
      const users = await response.json();
  
      // בודק אם יש משתמש עם מייל וסיסמה תואמים
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
  
      if (user) {
        return { status: "ok", user };
      } else {
        return { status: "error", message: "Invalid email or password" };
      }
    } catch (err) {
      console.error("Error reading users.json", err);
      return { status: "error", message: "Server error" };
    }
  }
  