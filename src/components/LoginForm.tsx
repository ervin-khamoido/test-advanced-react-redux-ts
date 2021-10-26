import React, {FC, useState} from 'react';
import {Button, Form, Input} from 'antd';
import { rules } from '../utils/rules';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const LoginForm: FC = () => {
   const {error, isLoading} = useTypedSelector(state => state.authReducer);
   const {login} = useActions();

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const submit = () => {
      login(username, password);
   }

   return (
      <Form
         name="loginFrom"
         labelCol={{ span: 8}}
         wrapperCol={{ span: 16}}
         initialValues={{ remember: true}}
         onFinish={submit}
         // onFinishFailed={onFinishFailed}
         autoComplete="on"
      >  
         {error && <div style={{color: 'darkred'}}>
            {error}
         </div>}
         <Form.Item
            label="Username"
            name="username"
            rules={[rules.required('Please input your username!')]}
         >
            <Input 
               value={username} 
               onChange={e => setUsername(e.target.value)} 
            />
         </Form.Item>

         <Form.Item
            label="Password"
            name="password"
            rules={[rules.required('Please input your password!')]}
         >
            <Input 
               value={password} 
               onChange={e => setPassword(e.target.value)} 
               type='password'
            />
         </Form.Item>

         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               LogIn
            </Button>
         </Form.Item>
      </Form>
   );
};

export default LoginForm;