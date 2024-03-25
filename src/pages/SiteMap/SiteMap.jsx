import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const routesData = [
    '/',
    '/order',
    '/contact',
    '/introduction',
    '/SiteMap',
    '/sign-in',
    '/sign-up',
    '/profile-user'
];

const SiteMap = () => {
    const [selectedRoutes, setSelectedRoutes] = useState([]);

    const renderRoutes = (routes) => {
        return (
            <ul>
                {routes.map((route, index) => (
                    route !== '/system/admin' && route !== '*' && (
                        <li key={index}>

                            <Link to={route}>{route}</Link>
                        </li>
                    )
                ))}
            </ul>
        );
    };

    const toggleRoute = (path) => {
        if (selectedRoutes.includes(path)) {
            setSelectedRoutes(selectedRoutes.filter(route => route !== path));
        } else {
            setSelectedRoutes([...selectedRoutes, path]);
        }
    };

    return (
        <div>
            <h1>Site Map</h1>
            {renderRoutes(routesData)}
        </div>
    );
};

export default SiteMap;
