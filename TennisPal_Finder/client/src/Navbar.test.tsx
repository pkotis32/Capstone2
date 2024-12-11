import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import NavigationBar from './Navbar';
import { MemoryRouter } from 'react-router-dom';



const logout = () => {
}
const user = "test"
const finishedProfile = true


// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <NavigationBar logout={logout} user={user} finishedProfile={finishedProfile}/>
    </MemoryRouter>
  )
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <NavigationBar logout={logout} user={user} finishedProfile={finishedProfile}/>
    </MemoryRouter>
  )
  expect(screen.getByText(/tennis pal finder/i, {selector: 'a'})).toBeInTheDocument()
})