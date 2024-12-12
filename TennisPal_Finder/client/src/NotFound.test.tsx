import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import NotFound from './NotFound';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <NotFound/>
    </MemoryRouter>
  )
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <NotFound/>
    </MemoryRouter>
  )
  expect(screen.getByText(/404 - page not found/i, {selector: 'h1'})).toBeInTheDocument()
})