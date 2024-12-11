import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Step3 from './Step3';
import { MemoryRouter } from 'react-router-dom';


const handleFinishProfile = () => {

}

// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Step3 handleFinishProfile={handleFinishProfile}/>
    </MemoryRouter>
  )
});


// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Step3 handleFinishProfile={handleFinishProfile}/>
    </MemoryRouter>
  )
  expect(screen.getByText(/select your availabilities/i, {selector: 'h3'})).toBeInTheDocument()
})