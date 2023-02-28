import React from 'react';
// import './App.css';
import {Routes,Route,Navigate} from "react-router-dom"
import Navbar from './Navbar';
import ContactList from './ContactList';
import AddContact from './AddContact';
import ViewContact from './ViewContact';
import EditContact from './EditContact';
import Spinner from '../images/Spinner';


let App=()=> {
  return (
   <>
   
    <Navbar/>
    <Routes>
      <Route path={"/"} element={<Navigate to ={'contacts/list'}/>}/>
      <Route path={"/contacts/list"} element={<ContactList/>}/>
      <Route path={"/contacts/add"} element={<AddContact/>}/>
      <Route path={"/contacts/view/:contactId"} element={<ViewContact/>}/>
      <Route path={"/contacts/edit/:contactId"} element={<EditContact/>}/>
      
    </Routes>

   </>
  );
}

export default App;
