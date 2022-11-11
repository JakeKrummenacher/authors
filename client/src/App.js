import logo from './logo.svg';
import './App.css';
import AuthorForm from './components/AuthorForm';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import CreateAuthor from './components/CreateAuthor';
import UpdateAuthor from './components/UpdateAuthor';
import AllAuthors from './components/AllAuthors';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AllAuthors/>}></Route>
          <Route path='/authors/new' element={<CreateAuthor/>}></Route>
          <Route path='/authors/edit/:id' element={<UpdateAuthor/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
