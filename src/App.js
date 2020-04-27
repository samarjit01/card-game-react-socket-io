import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Containers/Dashboard';

const App = () => {
  return (
    <div>
        <header class="justify-content-center text-center" style={{background:'gray' , height:'2rem'}}>AAO-BRE-KHELE</header>
        <Dashboard />
        <footer class="container-fluid footer" style={{background:'gray' , height:'1rem'}}></footer>
    </div>

  );
}

export default App;
