
import '@testing-library/jest-dom';
import UserCard from './UserCard';
import { MemoryRouter } from 'react-router-dom';



interface UserInfo {
  userId: number,
  username: string,
  firstName: string,
  lastName: string,
  skillLevel: string,
  distance: number,
  availabilities: string[]
}

const user: UserInfo = {
  userId: 1,
  username: "test",
  firstName: "test",
  lastName: "test",
  skillLevel: "test",
  distance: 1,
  availabilities: ["test"]
}

// smoke test
test("test", () => {
  <MemoryRouter>
    <UserCard user={user}/>
  </MemoryRouter>
});

