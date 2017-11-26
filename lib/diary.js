const fs = require('fs');
const path = require('path');


const _tags = (diary, str, length) => {
  const tags = str.match(/#[^\s]+/g);

  if (!tags) {
    return;
  }

  tags.forEach(key => {
    key = key.substr(1);
    diary._tags[key] = diary._tags[key] || [];
    diary._tags[key].push(length);
  });
};


class Diary {
  constructor() {
    this._entries = [];
    this._tags = {};
  }

  entry(body, date=new Date()) {
    const entry = { body, date };
    this._entries.push(entry);
    _tags(this, body, this._entries.length - 1);
    return entry;
  }

  entries() {
    return this._entries.slice();
  }

  tags() {
    return Object.keys(this._tags);
  }

  entriesWithTag(tag) {
    const indexes = this._tags[tag];
    const entries = indexes.map(i => this._entries[i]);
    return entries;
  }

  date(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    date = date.toISOString().slice(0, 10);
    return this._entries.filter(entry => {
      const then = entry.date.toISOString().slice(0, 10);
      return  then === date;
    });
  }

  search(q) {
    const re = new RegExp(q);
    return this._entries.filter(entry => {
      return re.test(entry.body);
    });
  }

  save(dataPath='./data/diary.json') {
    let data = { entries: this._entries, tags: this._tags };
    data = JSON.stringify(data, null, 2);
    return fs.writeFileSync(dataPath, data);
  }

  load(dataPath='./data/diary.json') {
    dataPath = path.resolve(dataPath);
    const data = require(dataPath);
    this._entries = data.entries.map(e => (
      { date: new Date(e.date), body: e.body }
    ));
    this._tags = data.tags;
  }
}


module.exports = Diary;
