const Diary = require('./diary');


const _dataPath = './data/diary.json';

const _createDiary = (dataPath) => {
  const diary = new Diary();
  diary.load(dataPath);
  return diary;
};


const CLI = {};


CLI.init = (fn, ...args) => {
  if (['save', 'load'].includes(fn)) {
    return;
  }

  const diary = _createDiary(_dataPath);
  const result = diary[fn](...args);

  if (fn === 'entry') {
    diary.save(_dataPath);
  }

  console.log(result);
};




module.exports = CLI;
