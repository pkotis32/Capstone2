import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom';
import Message from './Message';
import { MemoryRouter } from 'react-router-dom';



// smoke test
test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Message />
    </MemoryRouter>
  )
});


// test for proper contents
test("proper contents", () => {
  render(
    <MemoryRouter>
      <Message/>
    </MemoryRouter>
  )
  expect(screen.getByText(/send/i, {selector: 'button'})).toBeInTheDocument()
  
  // mimic user enterring a message

  // Find the input field by placeholder text or label
  const inputElement = screen.getByPlaceholderText(/Enter your message/i) as HTMLInputElement;

   // Simulate user typing into the input field
   fireEvent.change(inputElement, { target: { value: 'Hello' } });
  
   // Check if the input value has changed
   expect(inputElement.value).toBe('Hello');

})


