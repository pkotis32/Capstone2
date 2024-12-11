import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import FinishProfile from './FinishProfile';
import { MemoryRouter } from 'react-router-dom';


// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <FinishProfile />
    </MemoryRouter>
  )
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <FinishProfile />
    </MemoryRouter>
  )
  expect(screen.getByText(/complete profile/i, {selector: 'button'})).toBeInTheDocument()
})





