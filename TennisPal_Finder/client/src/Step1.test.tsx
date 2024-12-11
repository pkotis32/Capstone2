import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Step1 from './Step1';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Step1/>
    </MemoryRouter>
  ) 
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Step1/>
    </MemoryRouter>
  )
  expect(screen.getByText(/enter your home address/i, {selector: 'h2'})).toBeInTheDocument()
})