import React, {useMemo, useState} from 'react';
import Counter from './components/Counter';
import ClassCounter from './components/ClassCounter';
import './styles/App.css';
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import '../src/components/UI/button/MyButton.module.css';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import '../src/components/UI/MyModal/MyModal.module.css'

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'When JavaScript was born ?', body: 'JavaScript was born in 1995, December 4'},
    {id: 2, title: 'Person who created JavaScript', body: 'JavaScript was created by Brendan Eich'},
    {id: 3, title: 'JavaScript the best', body: '98% of websites use JavaScript on the client side for webpage behavior'},
  ])


  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);


  const sortedPosts = useMemo(() =>  {
    console.log('It works!')
    if(filter.sort) {
      return [...posts].sort((a, b) =>a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])


  const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


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
