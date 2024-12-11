import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import TennisCourts from './TennisCourts';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("test", () => {
  <MemoryRouter>
    <TennisCourts/>
  </MemoryRouter>
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <TennisCourts/>
    </MemoryRouter>
  )
  expect(screen.getByText(/tennis courts near you/i, {selector: 'h2'})).toBeInTheDocument()
})


