import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// components
import Header from './components/Header/Header';
import Book from './components/Book/Book';
import NotFound from './components/NotFound/NotFound';
//interface
import { BOOK } from './interface/interface';

export const BookContext = createContext(
  {} as {
    book: BOOK | undefined,
    setBook: React.Dispatch<React.SetStateAction<BOOK | undefined>>,
  }
);

const App: React.FC = () => {
  const [book, setBook] = useState<BOOK | undefined>();
  return (
    <Router>
      <BookContext.Provider 
        value={{
          book,
          setBook,
        }}
      >
        <Header />
        <Switch>
          <Route exact path='/:isbn/book' component={Book} />
          <Route exact path='/:isbn/notfound' component={NotFound} />
        </Switch>
      </BookContext.Provider>
    </Router>
  );
}

export default App;
