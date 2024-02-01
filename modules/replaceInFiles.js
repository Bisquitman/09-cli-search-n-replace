import fs from 'node:fs/promises';
import path from 'node:path';

export const replaceInFiles = async (directory, searchValue, replaceValue) => {
  try {
    const files = await fs.readdir(directory);
    files.forEach(async file => {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      try {
        if (stats.isFile() && path.extname(file) === '.txt') {
          const content = await fs.readFile(filePath, 'utf8');
          try {
            if (content.includes(searchValue)) {
              const updatedContent = content
                .split(searchValue)
                .join(replaceValue);

              try {
                await fs.writeFile(filePath, updatedContent, 'utf8');
                console.log(`Файл обновлен: ${filePath}`);
              } catch (err) {
                return console.error('Ошибка при записи файла: ', err);
              }
            }
          } catch (err) {
            return console.error('Ошибка при чтении файла: ', err);
          }
        }
      } catch (err) {
        return console.error('Ошибка при получении информации о файле: ', err);
      }
    });
  } catch (err) {
    return console.error('Ошибка при чтении директории: ', err);
  }
};
