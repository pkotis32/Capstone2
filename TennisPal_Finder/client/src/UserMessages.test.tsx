import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import UserMessages from './UserMessages';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("test", () => {
  <MemoryRouter>
    <UserMessages/>
  </MemoryRouter>
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <UserMessages/>
    </MemoryRouter>
  )
  expect(screen.getByText(/messages/i, {selector: 'h1'})).toBeInTheDocument()
})