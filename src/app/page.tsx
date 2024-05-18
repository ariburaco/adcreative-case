import SearchCharacter from '@/components/SearchCharacter';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto shadow-sm flex flex-col items-center justify-center w-full">
      <Image
        src="/rm.jpeg"
        alt="RN"
        width={1200}
        height={500}
        className="w-full rounded-t-[50px] max-h-[500px] object-cover"
      />
      <SearchCharacter />
    </main>
  );
}
