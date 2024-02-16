import logo from './logo.svg';
import './App.css';
import CreateBlog from './Components/CreateBlog';
import BlogPage from './Components/BlogPage';
import Dashboard from './Components/Dashboard';
import SignIn from './Components/SignIn';
import CreateAc from './Components/CreateAc';
// import U_main from './Components/U_main';
import U_main from './Components/U_main_old';
import {BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider, createRoutesFromElements, Navigate} from 'react-router-dom'
import Blog from './Components/Blog';
import Latest from './Components/Latest';
import PopularUp from './Components/PopularUp';
import History from './Components/History';
import Sol2D from './Components/Sol2D';
import AsBuilt from './Components/AsBuilt';
import ProcessEng from './Components/ProcessEng';
import Model3D from './Components/Model3D';
import Corporate from './Components/Corporate';
import MisCel from './Components/MisCel';
import Reverse from './Components/Reverse';
import Analysis from './Components/Analysis';
import DetailedDes from './Components/DetailedDes';
import OfficeLife from './Components/OfficeLife';
import ManageBlogs from './Components/ManageBlogs';
import UpdateBlog from './Components/UpdateBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<U_main/>}>
          <Route path="/" element={<Sol2D/>}>
            <Route path="/" element={<Latest cat="2D Sol"/>}/>
            <Route path="/popular" element={<PopularUp/>}/>
            <Route path="/history" element={<History/>}/>
          </Route>
          <Route path="/asbuilt" element={<AsBuilt/>}>
            <Route path="/asbuilt" element={<Latest cat="As Built"/>}/>
            <Route path="/asbuilt/popular" element={<PopularUp/>}/>
            <Route path="/asbuilt/history" element={<History/>}/>
          </Route>
          <Route path="/procegg" element={<ProcessEng/>}>
            <Route path="/procegg" element={<Latest cat="Process Engineering"/>}/>
            <Route path="/procegg/popular" element={<PopularUp/>}/>
            <Route path="/procegg/history" element={<History/>}/>
          </Route>
          <Route path="/model3d" element={<Model3D/>}>
            <Route path="/model3d" element={<Latest cat="Model 3D"/>}/>
            <Route path="/model3d/popular" element={<PopularUp/>}/>
            <Route path="/model3d/history" element={<History/>}/>
          </Route>
          <Route path="/corp" element={<Corporate/>}>
            <Route path="/corp" element={<Latest cat="Corporate"/>}/>
            <Route path="/corp/popular" element={<PopularUp/>}/>
            <Route path="/corp/history" element={<History/>}/>
          </Route>
          <Route path="/misc" element={<MisCel/>}>
            <Route path="/misc" element={<Latest cat="Miscellaneous"/>}/>
            <Route path="/misc/popular" element={<PopularUp/>}/>
            <Route path="/misc/history" element={<History/>}/>
          </Route>
          <Route path="/reverse" element={<Reverse/>}>
            <Route path="/reverse" element={<Latest cat="Reverse Engineering"/>}/>
            <Route path="/reverse/popular" element={<PopularUp/>}/>
            <Route path="/reverse/history" element={<History/>}/>
          </Route>
          <Route path="/analysis" element={<Analysis/>}>
            <Route path="/analysis" element={<Latest cat="Analysis"/>}/>
            <Route path="/analysis/popular" element={<PopularUp/>}/>
            <Route path="/analysis/history" element={<History/>}/>
          </Route>
          <Route path="/detdes" element={<DetailedDes/>}>
            <Route path="/detdes" element={<Latest cat="Detailed Design"/>}/>
            <Route path="/detdes/popular" element={<PopularUp/>}/>
            <Route path="/detdes/history" element={<History/>}/>
          </Route>
          <Route path="/officelife" element={<OfficeLife/>}>
            <Route path="/officelife" element={<Latest cat="Office Life"/>}/>
            <Route path="/officelife/popular" element={<PopularUp/>}/>
            <Route path="/officelife/history" element={<History/>}/>
          </Route>
        </Route>


        <Route path="/login" element={<SignIn/>}/>
        <Route path="/register" element={<CreateAc/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/createBlog" element={<CreateBlog/>}/>
        <Route path="/manageBlog" element={<ManageBlogs/>}/>
        <Route path="/updateBlog/:id" element={<UpdateBlog/>}/>
        <Route path="/admin/blog/:id" element={<Blog bth="admin"/>}/>
        <Route path="/user/blog/:id" element={<Blog btn="user"/>}/>
      </Routes>
    </Router>
  );
}


export default App;
