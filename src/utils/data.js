export const defaultCategories = [
  { id: 1, name: "GK" },
  { id: 2, name: "Java" },
  { id: 3, name: "Math" },
  { id: 4, name: "Python" },
  { id: 5, name: "Web" },
  { id: 6, name: "Bio" },
  { id: 7, name: "Database" },
];

export const defaultQuizzes = [
  { id: 101, title: "GK Quick 10", categoryId: 1, totalQuestions: 10, timeLimit: 120 },
  { id: 102, title: "Java Basics", categoryId: 2, totalQuestions: 10, timeLimit: 150 },
  { id: 103, title: "Math Practice", categoryId: 3, totalQuestions: 10, timeLimit: 180 },
  { id: 104, title: "Python Concepts", categoryId: 4, totalQuestions: 10, timeLimit: 150 },
  { id: 105, title: "Web Fundamentals", categoryId: 5, totalQuestions: 10, timeLimit: 200 },
  { id: 106, title: "Biology Quiz", categoryId: 6, totalQuestions: 10, timeLimit: 180 },
  { id: 107, title: "Database Basics", categoryId: 7, totalQuestions: 10, timeLimit: 180 },
];

export const defaultQuestions = [
  // GK (101)
  { id: 1001, quizId: 101, question: "Capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: 0 },
  { id: 1002, quizId: 101, question: "National animal of India?", options: ["Tiger", "Lion", "Elephant", "Peacock"], answer: 0 },
  { id: 1003, quizId: 101, question: "Who wrote the National Anthem?", options: ["Tagore", "Premchand", "Nehru", "Gandhi"], answer: 0 },
  { id: 1004, quizId: 101, question: "Largest ocean?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: 0 },
  { id: 1005, quizId: 101, question: "Which planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter", "Venus"], answer: 0 },
  { id: 1006, quizId: 101, question: "First President of India?", options: ["Rajendra Prasad", "Nehru", "Gandhi", "Patel"], answer: 0 },
  { id: 1007, quizId: 101, question: "Taj Mahal is in?", options: ["Agra", "Delhi", "Jaipur", "Kolkata"], answer: 0 },
  { id: 1008, quizId: 101, question: "Largest continent?", options: ["Asia", "Europe", "Africa", "Australia"], answer: 0 },
  { id: 1009, quizId: 101, question: "Currency of Japan?", options: ["Yen", "Won", "Dollar", "Euro"], answer: 0 },
  { id: 1010, quizId: 101, question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Kepler"], answer: 0 },

  // Java (102)
  { id: 1101, quizId: 102, question: "Java is developed by?", options: ["Sun Microsystems", "Microsoft", "Apple", "IBM"], answer: 0 },
  { id: 1102, quizId: 102, question: "JVM stands for?", options: ["Java Virtual Machine", "Java Visual Model", "Just Virtual Machine", "None"], answer: 0 },
  { id: 1103, quizId: 102, question: "Which keyword is used to inherit a class?", options: ["extends", "implements", "inherit", "super"], answer: 0 },
  { id: 1104, quizId: 102, question: "Which is not a Java feature?", options: ["Pointer", "OOP", "Platform Independent", "Robust"], answer: 0 },
  { id: 1105, quizId: 102, question: "Main method return type?", options: ["void", "int", "String", "char"], answer: 0 },
  { id: 1106, quizId: 102, question: "Which package contains ArrayList?", options: ["java.util", "java.lang", "java.io", "java.sql"], answer: 0 },
  { id: 1107, quizId: 102, question: "Which keyword prevents inheritance?", options: ["final", "private", "protected", "static"], answer: 0 },
  { id: 1108, quizId: 102, question: "Which collection does not allow duplicates?", options: ["Set", "List", "ArrayList", "Vector"], answer: 0 },
  { id: 1109, quizId: 102, question: "Java file extension?", options: [".java", ".class", ".jar", ".exe"], answer: 0 },
  { id: 1110, quizId: 102, question: "Java supports?", options: ["OOP", "Procedural", "Both", "None"], answer: 2 },

  // Math (103)
  { id: 1201, quizId: 103, question: "5 + 3 =", options: ["8", "7", "9", "6"], answer: 0 },
  { id: 1202, quizId: 103, question: "Square root of 81?", options: ["9", "8", "7", "6"], answer: 0 },
  { id: 1203, quizId: 103, question: "10 × 10 =", options: ["100", "110", "90", "101"], answer: 0 },
  { id: 1204, quizId: 103, question: "50 ÷ 5 =", options: ["10", "15", "25", "5"], answer: 0 },
  { id: 1205, quizId: 103, question: "100 − 45 =", options: ["55", "60", "65", "70"], answer: 0 },
  { id: 1206, quizId: 103, question: "7 × 6 =", options: ["42", "36", "49", "40"], answer: 0 },
  { id: 1207, quizId: 103, question: "Area of square = ?", options: ["side²", "2×side", "side×2", "side³"], answer: 0 },
  { id: 1208, quizId: 103, question: "π value approx?", options: ["3.14", "2.14", "4.13", "3.41"], answer: 0 },
  { id: 1209, quizId: 103, question: "15% of 200 =", options: ["30", "25", "20", "35"], answer: 0 },
  { id: 1210, quizId: 103, question: "1 km = ? m", options: ["1000", "100", "10", "500"], answer: 0 },

  // Python (104)
  { id: 1301, quizId: 104, question: "Python is developed by?", options: ["Guido van Rossum", "Bill Gates", "Dennis Ritchie", "Linus Torvalds"], answer: 0 },
  { id: 1302, quizId: 104, question: "Which keyword defines function?", options: ["def", "func", "define", "method"], answer: 0 },
  { id: 1303, quizId: 104, question: "Python file extension?", options: [".py", ".java", ".txt", ".exe"], answer: 0 },
  { id: 1304, quizId: 104, question: "Which type is mutable?", options: ["List", "Tuple", "String", "Integer"], answer: 0 },
  { id: 1305, quizId: 104, question: "Python supports?", options: ["OOP", "Functional", "Both", "None"], answer: 2 },
  { id: 1306, quizId: 104, question: "Which symbol for comment?", options: ["#", "//", "/*", "<!--"], answer: 0 },
  { id: 1307, quizId: 104, question: "Default data type for 10?", options: ["int", "float", "str", "bool"], answer: 0 },
  { id: 1308, quizId: 104, question: "len('abc') =", options: ["3", "2", "4", "1"], answer: 0 },
  { id: 1309, quizId: 104, question: "Which converts to int?", options: ["int()", "float()", "str()", "list()"], answer: 0 },
  { id: 1310, quizId: 104, question: "Which is immutable?", options: ["Tuple", "List", "Set", "Dict"], answer: 0 },

  // Web (105)
  { id: 1401, quizId: 105, question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tool Multi Language", "Hyperlinks Text Mark Language"], answer: 0 },
  { id: 1402, quizId: 105, question: "CSS used for?", options: ["Styling", "Logic", "Database", "Networking"], answer: 0 },
  { id: 1403, quizId: 105, question: "JS full form?", options: ["JavaScript", "JavaSource", "JustScript", "JungleScript"], answer: 0 },
  { id: 1404, quizId: 105, question: "React is a ___?", options: ["Library", "Framework", "Language", "Tool"], answer: 0 },
  { id: 1405, quizId: 105, question: "Bootstrap is?", options: ["CSS Framework", "JS Library", "Database", "None"], answer: 0 },
  { id: 1406, quizId: 105, question: "Default HTML font color?", options: ["Black", "Blue", "Red", "Grey"], answer: 0 },
  { id: 1407, quizId: 105, question: "Which tag for image?", options: ["<img>", "<src>", "<image>", "<pic>"], answer: 0 },
  { id: 1408, quizId: 105, question: "CSS property for text color?", options: ["color", "font", "background", "style"], answer: 0 },
  { id: 1409, quizId: 105, question: "JS type of null?", options: ["object", "string", "undefined", "number"], answer: 0 },
  { id: 1410, quizId: 105, question: "HTML5 introduced?", options: ["video tag", "meta tag", "frame", "table"], answer: 0 },

  // Bio (106)
  { id: 1501, quizId: 106, question: "Heart pumps?", options: ["Blood", "Water", "Air", "Oxygen"], answer: 0 },
  { id: 1502, quizId: 106, question: "Plant makes food by?", options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"], answer: 0 },
  { id: 1503, quizId: 106, question: "Human has ___ bones?", options: ["206", "210", "205", "201"], answer: 0 },
  { id: 1504, quizId: 106, question: "DNA stands for?", options: ["Deoxyribonucleic Acid", "Dynamic Nucleic Acid", "Double Nucleic Acid", "None"], answer: 0 },
  { id: 1505, quizId: 106, question: "Largest organ?", options: ["Skin", "Heart", "Brain", "Liver"], answer: 0 },
  { id: 1506, quizId: 106, question: "Plants absorb CO2 during?", options: ["Day", "Night", "Both", "None"], answer: 0 },
  { id: 1507, quizId: 106, question: "Smallest bone?", options: ["Stapes", "Femur", "Tibia", "Ulna"], answer: 0 },
  { id: 1508, quizId: 106, question: "Human blood pH?", options: ["7.4", "6.5", "8.1", "7.0"], answer: 0 },
  { id: 1509, quizId: 106, question: "Which organ purifies blood?", options: ["Kidney", "Liver", "Heart", "Lung"], answer: 0 },
  { id: 1510, quizId: 106, question: "Brain protected by?", options: ["Skull", "Rib", "Vertebra", "Spine"], answer: 0 },

  // Database (107)
  { id: 1601, quizId: 107, question: "SQL stands for?", options: ["Structured Query Language", "System Query Language", "Sequential Query Language", "Standard Query Language"], answer: 0 },
  { id: 1602, quizId: 107, question: "MySQL is?", options: ["Database", "Language", "OS", "Framework"], answer: 0 },
  { id: 1603, quizId: 107, question: "Which command retrieves data?", options: ["SELECT", "UPDATE", "DELETE", "INSERT"], answer: 0 },
  { id: 1604, quizId: 107, question: "Primary key is?", options: ["Unique identifier", "Duplicate value", "Foreign key", "Constraint"], answer: 0 },
  { id: 1605, quizId: 107, question: "SQL WHERE used for?", options: ["Filtering", "Sorting", "Joining", "Grouping"], answer: 0 },
  { id: 1606, quizId: 107, question: "COUNT() returns?", options: ["Number of rows", "Sum", "Average", "Max"], answer: 0 },
  { id: 1607, quizId: 107, question: "Which clause sorts data?", options: ["ORDER BY", "GROUP BY", "HAVING", "WHERE"], answer: 0 },
  { id: 1608, quizId: 107, question: "JOIN used to?", options: ["Combine tables", "Delete data", "Insert rows", "Alter table"], answer: 0 },
  { id: 1609, quizId: 107, question: "SQL keyword for unique?", options: ["DISTINCT", "UNIQUE", "SEPARATE", "DIFFERENT"], answer: 0 },
  { id: 1610, quizId: 107, question: "Which DB is NoSQL?", options: ["MongoDB", "MySQL", "Postgres", "Oracle"], answer: 0 },
];

export function ensureSeedData() {
  if (!localStorage.getItem("categories"))
    localStorage.setItem("categories", JSON.stringify(defaultCategories));
  if (!localStorage.getItem("quizzes"))
    localStorage.setItem("quizzes", JSON.stringify(defaultQuizzes));
  if (!localStorage.getItem("questions"))
    localStorage.setItem("questions", JSON.stringify(defaultQuestions));
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([{ name: "Demo User", email: "demo@user.com", password: "demo123", attempts: [] }])
    );
  }
  if (!localStorage.getItem("admins")) {
    localStorage.setItem(
      "admins",
      JSON.stringify([{ name: "Admin", email: "admin@quiz.com", password: "admin123" }])
    );
  }
}
