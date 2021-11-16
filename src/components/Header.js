import Navigation from "./Navigation";

export default function Header({ props, setSiteData }) {
  return (
    <header>
      <Navigation props={props} setSiteData={setSiteData} />
    </header>
  );
}
