import BookDisplayBasket from "../components/BookDisplayBasket";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Basket({
  siteData,
  removeFromBasket,
  updateAmountInBasket,
  clearBasket,
}) {
  function calculatePrice() {
    let totalPrice = 0;
    siteData.basketContent.map((bog) => {
      totalPrice += bog.amount * bog.pris;
      return null;
    });
    return totalPrice;
  }
  return (
    <div className="max-width">
      <Breadcrumbs
        links={[
          { link: "/", text: "Forside" },
          { link: "/basket", text: "Kurv" },
          { link: "/bestil", text: "Betaling" },
        ]}
      />
      {siteData.basketContent.length !== 0 ? (
        <div className="basket">
          <h2>Din kurv</h2>
          <div>
            {siteData.basketContent.map((bog) => {
              return (
                <BookDisplayBasket
                  bog={bog}
                  updateAmountInBasket={updateAmountInBasket}
                  removeFromBasket={removeFromBasket}
                  key={bog.titel}
                />
              );
            })}
          </div>
          <div>
            <p>I alt: {calculatePrice()},- kr.</p>
          </div>
          <Link to="/bestil">
            <button className="cta-contrast">Gå til betaling</button>
          </Link>
        </div>
      ) : (
        <div className="empty-basket basket">
          <p>Din kurv er tom. Besøg webshoppen og tilføj bøger her:</p>
          <Link to="/webshop">
            <button className="cta-contrast">Gå til webshop</button>
          </Link>
        </div>
      )}
    </div>
  );
}
