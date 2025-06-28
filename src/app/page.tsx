import { redirect } from 'next/navigation';

export default function RootPage() {
  // Always redirect to the login page.
  // The login page will then handle redirecting to /discover if the user is already authenticated.
  redirect('/login');
}
