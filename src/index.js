import React from 'react';
import {createRoot} from 'react-dom/client';
import configureTimerStore from './hooks-store/timer-store';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

configureTimerStore();

const root = createRoot(document.getElementById('root'));
root.render(<BrowserRouter><App /></BrowserRouter>);