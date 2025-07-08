import { Routes, Route } from 'react-router-dom';
import Hero from './components/home/Hero'
import Navbar from './components/home/Navbar'
import Login from './components/register/Login';
import SignUp from './components/register/SignUp';
import Lists from './components/lists/Lists';
import More from './components/home/More';
import Groups from './components/groups/Groups';
import ListShow from './components/lists/ListShow';
import CreateList from './components/lists/CreateList';
import CreateGroup from './components/groups/CreateGroup';
import GroupView from './components/groups/GroupView';

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
        <Route path="/createGroup" element={<CreateGroup/>} />
        <Route path="/groupView" element={<GroupView/>} />
        <Route path="/more" element={<More/>} />
        <Route path="/createList" element={<CreateList/>} />
      </Routes>
    </>
  )
}

export default App;
