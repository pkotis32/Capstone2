
import '@testing-library/jest-dom';
import MessageCard from './MessageCard';
import { MemoryRouter } from 'react-router-dom';


const message = {
  messageId: 1,
  senderId: 1,
  receiverId: 1, 
  messageText: "test",
  sentAt: "test"
}
const senderId = 1;

// smoke test
test("test", () => {
  <MemoryRouter>
    <MessageCard message={message} senderId={senderId}/>
  </MemoryRouter>
});

