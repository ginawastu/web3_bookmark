import React, { useState, useEffect } from 'react';
import { web3_bookmark_backend } from 'declarations/web3_bookmark_backend';
import './index.scss';

function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const res = await web3_bookmark_backend.getBookmarks();
    setBookmarks(res);
  };

  const addBookmark = async () => {
    await web3_bookmark_backend.addBookmark(title, url, tag);
    setTitle('');
    setUrl('');
    setTag('');
    fetchBookmarks();
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="vault-container">
      <h1 className="vault-title">Web3 Bookmark Vault</h1>
      <div className="vault-input">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
        <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" />
        <button onClick={addBookmark}>Add Bookmark</button>
      </div>
      <div className="vault-list">
        {bookmarks.map((bm, idx) => (
          <div className="bookmark-card" key={idx}>
            <h3>{bm.title}</h3>
            <p>{bm.url}</p>
            <span className="tag">#{bm.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;