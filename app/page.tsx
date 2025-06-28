import Image from "next/image";

export default function Home() {
  return (
    <section>
      <h1>Welcome to Home</h1>
      <p>This is the home page.</p>
      <Image
        src="https://picsum.photos/id/237/200/300"
        alt="test"
        width={300}
        height={300}
      />
    </section>
  );
}
