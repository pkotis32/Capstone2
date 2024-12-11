import {render} from '@testing-library/react'
import '@testing-library/jest-dom';
import UserMessagesCard from './UserMessagesCard';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest'

const user = "test";

// smoke test
test("test", () => {
  <MemoryRouter>
    <UserMessagesCard user={user}/>
  </MemoryRouter>
});