require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { Task } = require('./db/models');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post('/', async (req, res) => {
  try {
    const task = await Task.create({ title: req.body.title, condition: false });
    res.json(task);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.delete('/', async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.body.id }, });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.put('/', async (req, res) => {
  try {
    console.log(req.body.title);
    if (req.body.title) {
      let task = await Task.findByPk(req.body.id);
      await Task.update({ title: req.body.title }, { where: { id: task.id } });
      task = await Task.findByPk(req.body.id);
      res.json(task);
    } else {
      let task = await Task.findByPk(req.body.id);
      await Task.update({ condition: !task.condition }, { where: { id: task.id } });
      task = await Task.findByPk(req.body.id);
      res.json(task);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});


app.listen(process.env.PORT, () => {
  console.log('Server start ', process.env.PORT);
});
