import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard, Error, Landing, Login, Register, CreateJob, DeleteEdit, Admin } from "./pages/index";



function App() {
  return (
    <BrowserRouter>
      
      <nav className='MainNavBar'>
        <div className="CompanyLogo">
          <span class="material-symbols-outlined icon_nav">forest</span>
          <h1>The Forest Job </h1>
        </div>
        <Link className="CustomLink" to="/">Landing</Link>
        <Link className="CustomLink" to="/Dashboard">Dashboard</Link>
        <Link className="CustomLink" to="/createJob">Create Job</Link>
        <Link className="CustomLink" to="/deleteEdit">Edit and delete your advertisements</Link>
        <Link className="CustomLink" to="/admin">Admin</Link>
        <Link className="CustomLink" to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/createJob" element={<CreateJob/>}/>
        <Route path="/deleteEdit" element={<DeleteEdit/>}/> 
        <Route path="*" element={<Error />}/>
        <Route path="/admin" element={<Admin/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
