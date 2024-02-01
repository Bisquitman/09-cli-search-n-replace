#!/usr/bin/env node

import readline from 'node:readline/promises';
import process from 'node:process';
import { replaceInFiles } from './modules/replaceInFiles.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Запрос пути к директории
const dirPath = await rl.question('Введите путь к директории: ');
// Запрос строки поиска
const searchString = await rl.question('Введите строку для поиска: ');
// Запрос строки для замены
const replacementString = await rl.question('Введите строку для замены: ');
// Чтение и обработка файлов
await replaceInFiles(dirPath, searchString, replacementString);
rl.close();
