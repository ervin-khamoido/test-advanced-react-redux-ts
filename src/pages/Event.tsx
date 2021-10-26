import { Button, Modal, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
   const [modalVisible, setModalVisible] = useState(false);
   const {fetchGuests, createEvent, fetchEvents} = useActions();
   const {guests, events} = useTypedSelector(state => state.eventReducer);
   const {username} = useTypedSelector(state => state.authReducer.user)

   useEffect(() => {
      fetchGuests();
      fetchEvents(username);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const addNewEvent = (event: IEvent) => {
      setModalVisible(false);
      createEvent(event);
   }

   return (
      <div>
         <EventCalendar events={events} />

         <Row justify='center'>
            <Button 
               onClick={() => setModalVisible(true)}
            >
               Add an event
            </Button>
         </Row>

         <Modal
            title='Add an event'
            visible={modalVisible}
            footer={null}
            onCancel={() => setModalVisible(false)}
         >
            <EventForm
               guests={guests}
               submit={addNewEvent}
            />
         </Modal>
      </div>
   );
};

export default Event;