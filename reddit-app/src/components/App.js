import React, { useState, useEffect } from 'react';
import Form from './Form';
import '../style.css';
import axios from 'axios';

const App = () => {

    return (
      <div className='wrapper'>
        <h2 className='header'>Add to my feed:</h2>
        <Form />
      </div>
    )
}

export default App;


