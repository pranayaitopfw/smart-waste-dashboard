import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import { getDatabase }
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

databaseURL:
"https://YOUR_PROJECT-default-rtdb.firebaseio.com",

projectId: "YOUR_PROJECT",

storageBucket:
"YOUR_PROJECT.appspot.com",

messagingSenderId: "XXXX",

appId: "XXXX"

};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
