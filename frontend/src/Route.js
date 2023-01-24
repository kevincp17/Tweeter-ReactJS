import React from 'react';
import { Navigate, useRoutes} from 'react-router-dom';
import HomePage from './views/HomePage'; 
import ExplorePage from './views/ExplorePage'; 
import BookmarkPage from './views/BookmarkPage'; 
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import OtherProfilePage from './views/OtherProfilePage';

export default function Routes(isLoggedIn) {
  return useRoutes([
    {
      path: '/login',
      element: <LoginPage/>,
      // children:[
      //   {
      //     path: '/home', 
      //     element: <HomePage/>,
      //     children:[
      //       {path: '/explore', element: <ExplorePage/>},
      //       {path: '/bookmarks', element: <BookmarkPage/>}
      //     ]
      //   },
      // ]
    },
    {
      path: '/', 
          element: isLoggedIn ? <HomePage/> : <Navigate to="/login" replace />,
          children:[
            {path: '/explore', element: <ExplorePage/>},
            {path: '/bookmarks', element: <BookmarkPage/>},
            {path: '/profile', element: <ProfilePage/>},
            {path: '/other_profile', element: <OtherProfilePage/>}
          ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}