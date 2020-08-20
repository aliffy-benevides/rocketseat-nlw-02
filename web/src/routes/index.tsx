import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

import Login from '../pages/Login';
import Register from '../pages/Register';
import RegisterCompleted from '../pages/RegisterCompleted';

function SignedRoutes() {
    return (
        <Router>
            <Route exact path="/" component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
            <Redirect to="/" />
        </Router>
    );
}

function UnsignedRoutes() {
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/register-completed" component={RegisterCompleted} />
            <Route path="/forgot-password" component={Login} />
            <Redirect to="/" />
        </Router>
    );
}

function Routes() {
    const { signed } = useAuth();

    if (signed) {
        return <SignedRoutes />;
    } else {
        return <UnsignedRoutes />;
    }
}

export default Routes;