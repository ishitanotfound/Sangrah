import { Routes, Route } from 'react-router-dom';
import Navbar from './components/home/Navbar'
import Hero from './components/home/Hero'
import Login from './components/register/Login';
import SignUp from './components/register/SignUp';
import Lists from './components/lists/Lists';
import ListShow from './components/lists/ListShow';
import CreateList from './components/lists/CreateList';
import UpdateList from './components/lists/UpdateList';
import Groups from './components/groups/Groups';
import GroupView from './components/groups/GroupView';
import CreateGroup from './components/groups/CreateGroup';
import UpdateGroup from './components/groups/UpdateGroup';
import CreateGList from './components/groups/CreateGList';
import Account from './components/home/Account';
const baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  
  return (
    <>      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/lists" element={<Lists/>} /> 
        <Route path="/listShow/:id" element={<ListShow/>} />
        <Route path="/createList" element={<CreateList/>} />
        <Route path="/updateList/:id" element={<UpdateList />} />
        <Route path="/groups" element={<Groups/>} />
        <Route path="/groupView/:id" element={<GroupView/>} />
        <Route path="/createGroup" element={<CreateGroup/>} />
        <Route path="/updateGroup/:id" element={<UpdateGroup />} />
        <Route path="/createGList/:id" element={<CreateGList/>} />
        <Route path="/lists/:id" element={<ListShow />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  )
}

export default App;
