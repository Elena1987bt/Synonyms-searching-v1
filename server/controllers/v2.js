const { words } = require("../data.js");

class TrieNode {
  constructor() {
    this.children = {};
    this.synonyms = [];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, synonyms) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.synonyms = synonyms;
  }

  searchSynonyms(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    return node.synonyms.length > 0 ? node.synonyms : null;
  }
}

/* 1. Create a new tree */
const trie = new Trie();
/*2. Populate the tree with the raw data */
words.forEach((el) => {
  trie.insert(el.word, el.synonyms);
});
function findSynonyms(words, wordToSearch) {
  /* 1. Get all direct synonyms */
  const synonyms = trie.searchSynonyms(wordToSearch);

  /* 2. Get all related synonyms - Implement transitive rule */
  let allRelatedSynonyms = synonyms;
  if (synonyms) {
    console.log(`Synonyms of '${wordToSearch}': ${synonyms.join(", ")}`);
    synonyms.forEach((el) => {
      allRelatedSynonyms.push(trie.searchSynonyms(el));
    });
    console.log(allRelatedSynonyms);
    /* 3. Flatter array, remove null values and duplicates */
    const result = [
      ...new Set(allRelatedSynonyms.filter((el) => el !== null).flat()),
    ];
    return result;
  } else {
    console.log(`No synonyms found for '${wordToSearch}'`);
  }
}

/* Add a word to a dictionary */
function addNewWord(words, newWord) {
  words.push(newWord);
  trie.insert(newWord.word, newWord.synonyms);
}

/* Get all words from a dictionary */
function getAllWords(words) {
  return words;
}

module.exports = { findSynonyms, addNewWord, getAllWords };