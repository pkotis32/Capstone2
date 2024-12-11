import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Users from './Users';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("test", () => {
  <MemoryRouter>
    <Users/>
  </MemoryRouter>
});


// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Users/>
    </MemoryRouter>
  )
  expect(screen.getByText(/loading users.../i, {selector: 'div'})).toBeInTheDocument()
})