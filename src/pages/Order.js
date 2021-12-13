import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";

export default function Order({ siteData, clearBasket, setSiteData }) {
  const [paymentMethode, setPaymentMethode] = useState();
  const [deliveryMethode, setDeliveryMethode] = useState();
  const [inputEl, setInputEl] = useState();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cardForm = useRef();
  const [isNotValid, setIsNotValid] = useState(true);
  const [inputBeingEdited, setInputBeingEdited] = useState();

  useEffect(() => {
    if (inputEl !== undefined) {
      inputEl.setSelectionRange(0, 0);
    } else return;
    setInputEl();
  }, [inputEl]);

  useEffect(() => {
    const cardValuesToCheck =
      cardForm.current !== undefined && paymentMethode === "VISA/Dankort"
        ? cardForm.current[0].validity.valid &&
          cardForm.current[1].validity.valid &&
          cardForm.current[2].validity.valid &&
          cardForm.current[3].validity.valid
        : [];
    if (paymentMethode === "VISA/Dankort") {
      if (cardForm.current !== undefined && cardForm.current !== null) {
        if (cardValuesToCheck) {
          setIsNotValid(false);
        } else {
          setIsNotValid(true);
        }
      }
    }
  }, [inputBeingEdited, paymentMethode]);

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
      case "VISA/Dankort":
        return (
          <div>
            <form ref={cardForm}>
              <Input
                id="cardNumber"
                label="Kortnummer"
                mask="0000-0000-0000-0000"
                type="text"
                isRequired="true"
                pattern="([0-9]{4}[-]){3}([0-9]{4})"
                error="Venligst indtast et kortnummer på 16 cifre"
                setInputEl={setInputEl}
                autoFocus={true}
                onChange={(e) => setInputBeingEdited(e.target.value)}
              />
              <Input
                id="nameOnCard"
                label="Navn på kort"
                type="text"
                isRequired="true"
                pattern="[a-zA-Z ]+"
                error="Venligt indtast navnet på dit kort - mere end to bogstaver og ingen numre."
                placeholder="Fuldt navn på kort"
                setInputEl={setInputEl}
                onChange={(e) => setInputBeingEdited(e.target.value)}
              />
              <Input
                id="expirationDate"
                label="Udløbsdato"
                maskString="MM/YY"
                mask="00/00"
                type="text"
                isRequired="true"
                pattern="(?:([0][1-9]|([1][0-2]))[/]?)([2-9][0-9])"
                setInputEl={setInputEl}
                error="Venligst indtast udløbsdatoen på dit kort på formen MM/ÅÅ. Måneden skal være mellem 01-12 og året efter '20."
                onChange={(e) => setInputBeingEdited(e.target.value)}
              />
              <Input
                id="cvv"
                label="CVV"
                mask="000"
                type="text"
                isRequired="true"
                setInputEl={setInputEl}
                pattern="[0-9]{3}"
                error="Venligst indtast de 3 numre fra bagsiden af dit kort."
                onChange={(e) => setInputBeingEdited(e.target.value)}
              />
            </form>
          </div>
        );
      case "MobilePay":
        return (
          <div>
            <h2>
              Dette er en prototype: MobilePay-betalings UI er ikke sat op
            </h2>
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
      {siteData.basketContent.length !== 0 || orderPlaced === true ? (
        <div className="order">
          <section className="overview">
            <h2>Din bestilling</h2>
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
          <section className="delivery">
            <h2>Leveringsmetode</h2>
            <form>
              {["Post Nord", "GLS"].map((methode) => {
                return (
                  <label htmlFor={methode} key={methode} className="methode">
                    <input
                      type="radio"
                      value={methode}
                      id={methode}
                      name="delivery"
                      onChange={(e) => setDeliveryMethode(e.target.value)}
                    />
                    {methode}
                  </label>
                );
              })}
            </form>
          </section>
          <section className="payment">
            <h2>Vælg betalingsmetode</h2>
            <form>
              {["VISA/Dankort", "MobilePay"].map((methode) => {
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
                <button
                  type="submit"
                  className="cta-contrast"
                  onClick={() => {
                    setOrderPlaced(true);
                    clearBasket();
                  }}
                  disabled={
                    paymentMethode === "VISA/Dankort" ? isNotValid : false
                  }
                >
                  Placér ordre på {calculatePrice()},- kr.
                  {deliveryMethode !== undefined
                    ? ` med levering fra ${deliveryMethode}`
                    : ""}
                </button>
              </div>
            )}
          </section>
          {orderPlaced && (
            <div className="thanks">
              <section>
                <h2>Tak!</h2>
                <p>
                  Dette er en prototype og ingen af orderinformationerne er
                  sendt videre eller bliver husket.
                </p>
                <button
                  type="submit"
                  className="cta-contrast"
                  // onClick={() => window.location.assign("/kea/ulvenoguglen/")}
                  onClick={() => window.location.assign("/")}
                >
                  Tilbage til forsiden
                </button>
              </section>
            </div>
          )}
        </div>
      ) : (
        window.location.assign("/")
        // window.location.assign("/kea/ulvenoguglen/")
      )}
    </div>
  );
}
