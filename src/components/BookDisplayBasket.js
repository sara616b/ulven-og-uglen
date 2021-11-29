import { Link } from "react-router-dom";

export default function BookDisplayBasket({
  bog,
  updateAmountInBasket,
  removeFromBasket,
}) {
  return (
    <div className="bookdisplaybasket">
      <div className="background">
        <div className="content">
          <Link to={`/webshop/details?titel=${bog.slug}`}>
            <div className="image-holder">
              <img
                className="forsidebillede"
                src={bog.forsidebillede.guid}
                alt={`Forside på ${bog.titel}`}
              />
            </div>
          </Link>
          <div className="info">
            <Link to={`/webshop/details?titel=${bog.slug}`}>
              <h3 className="titel">{bog.titel}</h3>
              <p className="forfatter">af {bog.forfatter}</p>
              <p className="pris">
                {bog.amount > 1
                  ? `${bog.pris * bog.amount},- kr. (${bog.amount} stk á ${
                      bog.pris
                    } kr.)`
                  : `${bog.pris},- kr.`}
              </p>
            </Link>
            <div className="amount-control">
              <button
                onClick={(e) => {
                  updateAmountInBasket(bog, e.target.innerHTML);
                }}
                className="cta-contrast"
                disabled={bog.amount === 1 ? true : false}
              >
                -
              </button>
              <p>{bog.amount}</p>
              <button
                onClick={(e) => {
                  updateAmountInBasket(bog, e.target.innerHTML);
                }}
                className="cta-contrast"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                removeFromBasket(bog);
              }}
              className="remove-button"
            >
              Fjern fra kurv
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
