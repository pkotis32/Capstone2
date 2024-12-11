import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Step2 from './Step2';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Step2/>
    </MemoryRouter>
  )
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Step2/>
    </MemoryRouter>
  )
  expect(screen.getByText(/enter preferred court address/i, {selector: 'h2'})).toBeInTheDocument()
})