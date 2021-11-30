import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react/cjs/react.development";
import Input from "../components/Input";

export default function Basket({
  siteData,
  removeFromBasket,
  updateAmountInBasket,
  clearBasket,
}) {
  const [paymentMethode, setPaymentMethode] = useState();
  const [inputEl, setInputEl] = useState();

  useEffect(() => {
    if (inputEl !== undefined) {
      inputEl.setSelectionRange(0, 0);
    } else return;
    setInputEl();
  }, [inputEl]);

  function calculatePrice() {
    let totalPrice = 0;
    siteData.basketContent.map((bog) => {
      totalPrice += bog.amount * bog.pris;
      return null;
    });
    return totalPrice;
  }

  function paymentSwitch(methode) {
    switch (methode) {
      case "VISA":
        return (
          <div>
            <form>
              <Input
                id="cardNumber"
                label="Card Number"
                mask="0000-0000-0000-0000"
                type="text"
                isRequired="true"
                pattern="([0-9]{4}[-]){3}([0-9]{4})"
                error="Please enter a cardnumber that's 16 ciphers long"
                setInputEl={setInputEl}
                autoFocus={true}
              />

              <Input
                id="nameOnCard"
                label="Name on card"
                type="text"
                isRequired="true"
                pattern="[a-zA-Z ]+"
                error="Please enter the name on your card. More than two letters. No numbers."
                placeholder="Full name on card"
                setInputEl={setInputEl}
              />

              <Input
                id="expirationDate"
                label="Expiration date"
                maskString="MM/YY"
                mask="00/00"
                type="text"
                isRequired="true"
                pattern="(?:([0][1-9]|([1][0-2]))[/]?)([2-9][0-9])"
                setInputEl={setInputEl}
                error="Please type in the expiration date from your card with the pattern MM/YY. The month needs to be between 01-12 and the year after '20"
              />

              <Input
                id="cvv"
                label="CVV"
                mask="000"
                type="text"
                isRequired="true"
                setInputEl={setInputEl}
                pattern="[0-9]{3}"
                error="Please enter the 3 numbers from the back of your card"
              />

              <button type="submit" className="cta-contrast">
                Place order
              </button>
            </form>
          </div>
        );
      case "DANKORT":
        return (
          <div>
            <h2>Dankort</h2>
          </div>
        );
      case "MobilePay":
        return (
          <div>
            <h2>MobilePay</h2>
          </div>
        );
      default:
        return "Vælg en betalingsmetode";
    }
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
        <div className="order">
          <section className="overview">
            <h2>Din bestilling:</h2>
            <div>
              {siteData.basketContent.map((bog) => {
                return (
                  <div key={bog.titel}>
                    <img src={bog.forsidebillede.guid} alt={bog.titel} />
                    <div>
                      <p>{bog.titel}</p>
                      <p>{bog.amount * bog.pris},- kr. i alt</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <p>Total: {calculatePrice()},- kr.</p>
            </div>
          </section>
          <section>
            <h2>Leveringsmetode</h2>
          </section>
          <section className="payment">
            <h2>Vælg betalingsmetode:</h2>
            <form>
              {["VISA", "DANKORT", "MobilePay"].map((methode) => {
                return (
                  <label htmlFor={methode} key={methode} className="methode">
                    <input
                      type="radio"
                      value={methode}
                      id={methode}
                      name="payment"
                      onChange={(e) => setPaymentMethode(e.target.value)}
                    />
                    {methode}
                  </label>
                );
              })}
            </form>
            {paymentMethode !== undefined && (
              <div>
                <h3>Betal med {paymentMethode}</h3>
                {paymentSwitch(paymentMethode)}
              </div>
            )}
          </section>
        </div>
      ) : (
        window.location.assign("/")
      )}
    </div>
  );
}
