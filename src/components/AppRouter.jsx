import React from "react";
import { Redirect, Route } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';

const AppRouter = () => {
    return (
        <div>
            <Route path='/about'>
                <About />
            </Route>
            <Redirect from='' to='/about' />
            <Route path='/posts'>
                <Posts />
            </Route>
        </div>
    );
};

export default AppRouter;