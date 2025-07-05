import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Lists from './components/lists/Lists';
import More from './components/More';
import Groups from './components/groups/Groups';
import ListShow from './components/lists/ListShow';
import CreateList from './components/lists/CreateList';

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/lists" element={<Lists/>} />
        <Route path="/listShow" element={<ListShow/>} />
        <Route path="/groups" element={<Groups/>} />
        <Route path="/more" element={<More/>} />
        <Route path="/createList" element={<CreateList/>} />
      </Routes>
    </>
  )
}

export default App;
