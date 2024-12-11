import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';


const finishedProfile = true;
// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Home finishedProfile={finishedProfile}/>
    </MemoryRouter>
  )
});



