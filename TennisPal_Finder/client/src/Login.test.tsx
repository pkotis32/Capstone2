import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';



const login = async (username: string, password: string): Promise<string | null> => {
  username;
  password
  return "test"
}
// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
        <Login login={login}/>
    </MemoryRouter>
  )
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Login login={login}/>
    </MemoryRouter>
  )
  expect(screen.getByText(/login/i, {selector: 'h1'})).toBeInTheDocument()
})