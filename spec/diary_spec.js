const Diary = require('../lib/diary');


describe('Diary', () => {
  let diary;


  beforeEach(() => {
    diary = new Diary();
  });


  describe('.entry()', () => {
    xit("adds an entry to the user's diary");
    xit("adds the time/date of the entry's creation");
    xit("allows the time/date of the entry to be set");
  });


  describe('.entries', () => {
    xit("returns a list of all entries");
  });


  describe('.tags()', () => {
    xit("returns a list of hashtags from entries");
  });


  describe('.entriesWithTag()', () => {
    xit("returns a list of every entry with the given tag");
  });


  describe('.date()', () => {
    xit("returns a list of every entry written on the given date");
  });


  describe('.search()', () => {
    xit("returns a list of all entries with the given string");
  });


  describe('.save()', () => {
    xit("persists the current state of the diary to the given file");
  });


  describe('.load()', () => {
    xit("loads the state of the given diary from a file");
  });
});
