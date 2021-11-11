import Navigation from "./Navigation";

export default function Header({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Navigation title={title} />
    </div>
  );
}
