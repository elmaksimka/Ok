const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Підключення до MongoDB
mongoose.connect(
  "mongodb+srv://Reval1vity:Elmaksimka123@mernshopcluster.hojarxq.mongodb.net/mernshop?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Схема та модель для збереження даних форми
const FormSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  email: String,
  address: String,
  zipcode: String,
  city: String,
  country: String,
});

const FormModel = mongoose.model("FormData", FormSchema);

// Розбір тіла запиту
app.use(bodyParser.urlencoded({ extended: true }));

// Маршрут для обробки даних форми
app.post("/submitForm", (req, res) => {
  const formData = req.body;

  // Створюємо новий об'єкт моделі з отриманими даними форми
  const newForm = new FormModel({
    lastname: formData.lastname,
    firstname: formData.firstname,
    email: formData.email,
    address: formData.address,
    zipcode: formData.zipcode,
    city: formData.city,
    country: formData.country,
  });

  // Зберігаємо дані у MongoDB
  newForm.save((err, savedForm) => {
    if (err) {
      console.error("Помилка збереження даних:", err);
      return res.status(500).send("Помилка збереження даних форми.");
    }

    console.log("Дані форми збережено:", savedForm);
    return res.status(200).send("Дані форми збережено успішно.");
  });
});

// Запуск сервера
const port = 7000;
app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}.`);
});
