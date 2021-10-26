import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../routers';

const AppRouter = () => {
   const {isAuth} = useTypedSelector(state => state.authReducer);

   return (
      isAuth
      ?
         <Switch>
            {privateRoutes.map(route => 
               <Route 
                  key={route.path}
                  path={route.path} 
                  exact={route.exact} 
                  component={route.component} 
               />
            )}
            
            <Redirect to={RouteNames.EVENT} />
         </Switch>
      :
         <Switch>
            {publicRoutes.map(route => 
               <Route 
                  key={route.path}
                  {...route}
               />
            )}
            
            <Redirect to={RouteNames.LOGIN} />
         </Switch>
   );
};

export default AppRouter;