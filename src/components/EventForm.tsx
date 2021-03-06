import { FC, useState } from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
   guests: IUser[],
   submit: (event: IEvent) => void,
}

const EventForm: FC<EventFormProps> = (props) => {
   const [event, setEvent] = useState<IEvent>({
      author: '',
      date: '',
      description: '',
      guest: ''
   } as IEvent);

   const {username} = useTypedSelector(state => state.authReducer.user)

   const selectDate = (date: Moment | null) => {
      if (date) {
         setEvent({...event, date: formatDate(date.toDate())});
      }
   }

   const submitForm = () => {
      props.submit({...event, author: username});
   }

   return (
      <Form
         labelCol={{ span: 8}}
         wrapperCol={{ span: 16}}
         onFinish={submitForm}
      >
         <Form.Item
            label="Event description"
            name="description"
            rules={[rules.required('Required value')]}
         >
            <Input 
               value={event.description}
               onChange={e => setEvent({...event, description: e.target.value})}
            />
         </Form.Item>

         <Form.Item
            label="Event date"
            name="date"
            rules={[rules.required('Required value'), rules.isDateAfter('You cannot create an event in the past!')]}
         >
            <DatePicker
               onChange={(date) => selectDate(date)}
            />
         </Form.Item>

         <Form.Item
            label="Select a guest"
            name="guest"
            rules={[rules.required('Required value')]}
         >
            <Select style={{ width: 120 }} onChange={(guest: string) => setEvent({...event, guest})}>
               {props.guests.map(guest =>
                  <Select.Option key={guest.username} value={guest.username}>
                     {guest.username}
                  </Select.Option>
               )}
            </Select>
         </Form.Item>

         <Row justify='end'>
            <Form.Item >
               <Button type="primary" htmlType="submit">
                  Create
               </Button>
            </Form.Item>
         </Row>
      </Form>
   );
};

export default EventForm;