export default function FilterByBrand() {
  return (
    <div className="widget widget-filter mb-4 pb-4 border-bottom">
      <h3 className="widget-title">Brand</h3>
      <div className="input-group input-group-sm mb-2">
        <input
          className="widget-filter-search form-control rounded-end pe-5"
          type="text"
          placeholder="Search"
        />
        <i className="ci-search position-absolute top-50 end-0 translate-middle-y fs-sm me-3"></i>
      </div>
      <ul
        className="widget-list data widget-filter-list list-unstyled pt-1"
        data-simplebar
        data-simplebar-auto-hide="false"
      >
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="adidas" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="adidas"
            >
              Adidas
            </label>
          </div>
          <span className="fs-xs text-muted">425</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="ataylor" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="ataylor"
            >
              Ann Taylor
            </label>
          </div>
          <span className="fs-xs text-muted">15</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="armani" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="armani"
            >
              Armani
            </label>
          </div>
          <span className="fs-xs text-muted">18</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="banana" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="banana"
            >
              Banana Republic
            </label>
          </div>
          <span className="fs-xs text-muted">103</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="bilabong" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="bilabong"
            >
              Bilabong
            </label>
          </div>
          <span className="fs-xs text-muted">27</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="birkenstock"
            />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="birkenstock"
            >
              Birkenstock
            </label>
          </div>
          <span className="fs-xs text-muted">10</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="klein" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="klein"
            >
              Calvin Klein
            </label>
          </div>
          <span className="fs-xs text-muted">365</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="columbia" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="columbia"
            >
              Columbia
            </label>
          </div>
          <span className="fs-xs text-muted">508</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="converse" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="converse"
            >
              Converse
            </label>
          </div>
          <span className="fs-xs text-muted">176</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="dockers" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="dockers"
            >
              Dockers
            </label>
          </div>
          <span className="fs-xs text-muted">54</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="fruit" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="fruit"
            >
              Fruit of the Loom
            </label>
          </div>
          <span className="fs-xs text-muted">739</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="hanes" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="hanes"
            >
              Hanes
            </label>
          </div>
          <span className="fs-xs text-muted">92</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="choo" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="choo"
            >
              Jimmy Choo
            </label>
          </div>
          <span className="fs-xs text-muted">17</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="levis" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="levis"
            >
              Levi&#39;s
            </label>
          </div>
          <span className="fs-xs text-muted">361</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="lee" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="lee"
            >
              Lee
            </label>
          </div>
          <span className="fs-xs text-muted">264</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wearhouse"
            />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="wearhouse"
            >
              Men Wearhouse
            </label>
          </div>
          <span className="fs-xs text-muted">75</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="newbalance"
            />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="newbalance"
            >
              New Balance
            </label>
          </div>
          <span className="fs-xs text-muted">218</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="nike" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="nike"
            >
              Nike
            </label>
          </div>
          <span className="fs-xs text-muted">810</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="navy" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="navy"
            >
              Old Navy
            </label>
          </div>
          <span className="fs-xs text-muted">147</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="polo" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="polo"
            >
              Polo Ralph Lauren
            </label>
          </div>
          <span className="fs-xs text-muted">64</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="puma" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="puma"
            >
              Puma
            </label>
          </div>
          <span className="fs-xs text-muted">370</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="reebok" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="reebok"
            >
              Reebok
            </label>
          </div>
          <span className="fs-xs text-muted">506</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="skechers" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="skechers"
            >
              Skechers
            </label>
          </div>
          <span className="fs-xs text-muted">209</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="hilfiger" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="hilfiger"
            >
              Tommy Hilfiger
            </label>
          </div>
          <span className="fs-xs text-muted">487</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="armour" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="armour"
            >
              Under Armour
            </label>
          </div>
          <span className="fs-xs text-muted">90</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="urban" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="urban"
            >
              Urban Outfitters
            </label>
          </div>
          <span className="fs-xs text-muted">152</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="vsecret" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="vsecret"
            >
              Victoria&#39;s Secret
            </label>
          </div>
          <span className="fs-xs text-muted">238</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center mb-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="wolverine"
            />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="wolverine"
            >
              Wolverine
            </label>
          </div>
          <span className="fs-xs text-muted">29</span>
        </li>
        <li className="widget-filter-item d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wrangler" />
            <label
              className="form-check-label widget-filter-item-text"
              htmlFor="wrangler"
            >
              Wrangler
            </label>
          </div>
          <span className="fs-xs text-muted">115</span>
        </li>
      </ul>
      <style jsx>
        {`
          .widget-list.data {
            max-height: 11rem;
          }
        `}
      </style>
    </div>
  );
}
