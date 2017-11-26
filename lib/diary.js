

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
    this._entries.push({ body, date });
    _tags(this, body, this._entries.length - 1);
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
}


module.exports = Diary;
