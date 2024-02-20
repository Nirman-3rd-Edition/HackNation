import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    console.log("heyyyy");
    router.push('/Homepage');
  }, []);

  return null;
}