import { Clerk } from '@clerk/nextjs';

declare global {
  interface Window {
    Clerk: Clerk;
  }
}
