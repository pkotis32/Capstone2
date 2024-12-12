
import '@testing-library/jest-dom';
import UserMessagesCard from './UserMessagesCard';
import { MemoryRouter } from 'react-router-dom';


const user = "test";

// smoke test
test("test", () => {
  <MemoryRouter>
    <UserMessagesCard user={user}/>
  </MemoryRouter>
});