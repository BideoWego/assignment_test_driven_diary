const fs = require('fs');
const Diary = require('../lib/diary');


describe('Diary', () => {
  let diary;


  beforeEach(() => {
    diary = new Diary();
  });


  describe('.entry()', () => {
    it("adds an entry to the user's diary", () => {
      diary.entry('hello');
      expect(diary.entries()[0].body).toBe('hello');
    });

    it("adds the time/date of the entry's creation", () => {
      diary.entry('hello');
      const then = diary.entries()[0].date.toISOString().slice(0, 19);
      const now = new Date().toISOString().slice(0, 19);
      expect(then).toBe(now);
    });

    it("allows the time/date of the entry to be set", () => {
      const date = new Date(2000, 0, 1);
      diary.entry('hello', date);
      const then = diary.entries()[0].date.toISOString();
      const time = date.toISOString();
      expect(then).toBe(time);
    });
  });


  describe('.entries', () => {
    it("returns a list of all entries", () => {
      diary.entry('hello');
      diary.entry('bye');
      const entries = diary.entries();
      expect(entries.length).toBe(2);
      expect(entries[0].body).toBe('hello');
      expect(entries[1].body).toBe('bye');
    });
  });


  describe('.tags()', () => {
    it("returns a list of hashtags from entries", () => {
      diary.entry('#foo #bar fiz baz #fiz');
      expect(diary.tags()).toContain('foo', 'bar', 'fiz');
    });
  });


  describe('.entriesWithTag()', () => {
    it("returns a list of every entry with the given tag", () => {
      diary.entry('hello #foobar');
      diary.entry('bye #foobar');
      const entries = diary.entriesWithTag('foobar').map(e => e.body);
      expect(entries).toContain('hello #foobar', 'bye #foobar');
    });
  });


  describe('.date()', () => {
    it("returns a list of every entry written on the given date", () => {
      diary.entry('hello');
      diary.entry('bye');
      const entries = diary.date(new Date()).map(e => e.body);
      expect(entries).toContain('hello', 'bye');
    });
  });


  describe('.search()', () => {
    it("returns a list of all entries with the given string", () => {
      diary.entry('hi there');
      diary.entry('Ohio');
      const entries = diary.search('hi').map(e => e.body);
      expect(entries).toContain('hi there', 'Ohio');
    });
  });


  describe('persistence', () => {
    let dataPath = './spec/data/diary.json';


    beforeEach(() => {
      if (fs.existsSync(dataPath)) {
        fs.unlinkSync(dataPath);
      }
      diary.entry('hello');
      diary.save(dataPath);
      diary = new Diary();
      diary.load(dataPath);
    });


    describe('.save()', () => {
      it("persists the current state of the diary to the given file", () => {
        expect(diary.entries()[0].body).toBe('hello');
      });
    });


    describe('.load()', () => {
      it("loads the state of the given diary from a file", () => {
        expect(diary.entries()[0].body).toBe('hello');
      });
    });
  });
});
