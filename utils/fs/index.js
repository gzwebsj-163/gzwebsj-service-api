const fs = require('fs');
const { isString } = require('../types');
module.exports = {

  openENV: (path) => {
    try {
      if(!isString(path))return false;
      const d = fs.readFileSync(path, 'utf-8');
      const line = d.split('\n');
      line.forEach(lines => {
        const [key, value] = lines.split('=');
        process.env[key.trim()] = value.trim();
      });
    } catch (e) {

    }
  }
}