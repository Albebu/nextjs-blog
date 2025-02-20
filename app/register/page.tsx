export default async function RegisterPage() {
  return (
    <form className="flex flex-col gap-2">
      <input className="border border-black" type="email" placeholder="Email" />
      <input
        className="border border-black"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
