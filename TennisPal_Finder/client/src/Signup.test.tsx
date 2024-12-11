import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import Signup from './Signup';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest'

interface SignupArgs {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  skillLevel: string;
}

const signup = async (signupArgs: SignupArgs): Promise<string | null> => {
  signupArgs;
  return "test" 
}

// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Signup signup={signup}/>
    </MemoryRouter>
  )
});

// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Signup signup={signup}/>
    </MemoryRouter>
  )

  expect(screen.getByText(/Signup/i, {selector: 'h1'})).toBeInTheDocument()
})
