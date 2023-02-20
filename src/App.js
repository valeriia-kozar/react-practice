import React, {useState} from 'react';
import './styles/App.css';
import {BrowserRouter, Router}


function App() {
  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter
      filter={filter}
      setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts"/>
    </div>
  );

}

export default App;
