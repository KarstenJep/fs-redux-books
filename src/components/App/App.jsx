import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';

import './App.css';
import { useEffect } from 'react';

import {useDispatch} from 'react-redux';

function App() {

  const dispatch = useDispatch();

  // const fetchBookList = () => {
  //   // Axios.get('/books')
  //   //   .then(response => {
  //   //     // Send to reducer
  //   //     dispatch({type: 'SET_BOOK_LIST', payload: response.data});
  //   //   })
  //   //   .catch(error => {
  //   //     alert(`Sorry. Thnings aren't working at the moment`);
  //   //     console.log('Error getting books', error);
  //   //   })
  // }

  // TODO - GET Book List from server as we load
  useEffect(() => {
    // Todo - replace this function with dispatch action
    // fetchBookList();
    dispatch({type: 'FETCH_BOOKS'});
  }, [])

  return (
    <div className="App">
      <header><h1>Books w/ Redux!</h1></header>
      <main>
        <BookForm />
        <BookList />
      </main>
    </div>
  );
}

export default App;