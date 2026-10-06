import "./SiteHeader.css";

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#home">
          PORTFOLIO
        </a>
        <p className="site-header__status">Interactive 3D Experience</p>
      </div>
    </header>
  );
}

export default SiteHeader;
