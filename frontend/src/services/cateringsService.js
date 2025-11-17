// src/services/cateringsService.js
import cateringsData from "../Data/Caterings.json"; // הנתונים שלך בקובץ JSON

export const cateringsService = {
  getAll: () => {
    // מחזיר Promise כדי שנוכל להעתיק את ההתנהגות של API אמיתי
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("מקור הנתונים: src/Data/Caterings.json"); // הדפס מקור
        console.log("נתוני קייטרינגים:", cateringsData); // הדפס את כל המידע
        resolve(cateringsData);
      }, 300); // סימולציה של טעינה
    });
  },
};
