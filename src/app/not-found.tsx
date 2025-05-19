import Link from "next/link";

export default function NotFound() {
  //IDWVaONxBtkcPOd6pc
  return (
    <div className="flex flex-1 justify-center items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
