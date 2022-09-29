const express = require('express');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validations');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const routes = require('./routes');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// eslint-disable-next-line import/order
const mongoose = require('mongoose');
// eslint-disable-next-line import/order
const { errors } = require('celebrate');
// eslint-disable-next-line import/order
const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');
// eslint-disable-next-line import/order
const { logger } = require('express-winston');

// eslint-disable-next-line import/no-unresolved,import/order
// const cors = require('cors');

const app = express();

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    // useUnifiedTopology: false,
  });

  app.use(express.json());
  // app.use(cors());
  app.use(cookieParser());

  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.use(requestLogger); // подключаем логгер запросов
  app.post('/signin', validationLogin, login);
  app.post('/signup', validationCreateUser, createUser);

  app.use(routes);

  app.use(errorLogger); // подключаем логгер ошибок
  app.use(logger);

  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
  });
}

main();
