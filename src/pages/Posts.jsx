import React, {useState} from 'react';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import '../components/UI/button/MyButton.module.css';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import {usePosts} from '../hooks/usePosts';
import {useEffect} from 'react';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import {useFetching} from '../hooks/useFetching';
import {getPageCount} from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';

function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  

  // ДЗ,воспользоваться ниже useMemo и сделать так, чтобы этот массив не пересчитывался на каждом рендере, а пересчитывался тогда, когда изменилось общее кол-во страниц
  // let pagesArray = []
  // for (let i = 0; i < totalPages ; i++) {
  //   pagesArray.push(i + 1);
  // }

  const [fetchPosts, isPostsLoading, postError] = useFetching(async() => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount (totalCount, limit));
  })
  console.log(totalPages)

  useEffect (() => {
    fetchPosts('')
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
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
      {postError &&
        <h1>Error hapened ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display:'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts"/>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );

}

export default Posts;