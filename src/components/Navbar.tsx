import React, {FC} from 'react';
import {Layout, Row, Menu} from 'antd';
import {useHistory} from 'react-router-dom';


import { RouteNames } from '../routers';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
   const router = useHistory();
   const {isAuth, user} = useTypedSelector(state => state.authReducer);
   const {logout} = useActions();

   return (
      <Layout.Header>
         <Row justify='end'>
            {
               isAuth
               ?
                  <>
                     <div key={0} style={{color: '#fff'}}>{user.username}</div>
                     <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item 
                           onClick={logout} 
                           key={1}
                        >
                           LogOut
                        </Menu.Item>
                     </Menu>
                  </>
               :
                  <Menu theme="dark" mode="horizontal" selectable={false}>
                     <Menu.Item 
                        onClick={() => router.push(RouteNames.LOGIN)} 
                        key={1}
                     >
                        LogIn
                     </Menu.Item>
                  </Menu>
            }
            
         </Row>
      </Layout.Header>
   );
};

export default Navbar;