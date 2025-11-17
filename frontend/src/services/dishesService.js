// src/services/dishesService.js
import dishesData from "../Data/Dish.json";
import categoriesData from "../Data/MenuCategory.json"; // הקובץ של קטגוריות מנות

export const dishesService = {
  // מחזיר את כל המנות
  getAll: () => {
    console.log("dishesService.js: getAll() מקור הנתונים: src/Data/Dish.json", dishesData);
    return new Promise((resolve) => {
      setTimeout(() => resolve(dishesData), 300);
    });
  },

  // מחזיר מנה לפי ID
  getById: (id) => {
    const numericId = Number(id);
    const dish = dishesData.find(d => d.id === numericId);
    console.log("dishesService.js: getById(", id, ") →", dish);
    return new Promise((resolve) => {
      setTimeout(() => resolve(dish || null), 300);
    });
  },

  // מחזיר מנות לפי קייטרינג
  getByCateringId: (cateringId) => {
    const numericId = Number(cateringId);
    console.log("dishesService.js: getByCateringId(", cateringId, ") מקור הנתונים: src/Data/Dish.json");

    // שליפת כל הקטגוריות של הקייטרינג
    const categoriesOfCatering = categoriesData
      .filter(cat => Number(cat.catering_id) === numericId)
      .map(cat => cat.id);

    console.log("dishesService.js: קטגוריות של הקייטרינג:", categoriesOfCatering);

    // סינון מנות ששייכות לקטגוריות של הקייטרינג
    const filtered = dishesData.filter(d => categoriesOfCatering.includes(d.category_id));
    console.log("dishesService.js: מנות מסוננות לפי קייטרינג:", filtered);

    return new Promise((resolve) => {
      setTimeout(() => resolve(filtered), 300);
    });
  }
};
