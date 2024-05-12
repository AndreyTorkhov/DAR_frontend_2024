import "../styles/header.css";

function Header(props) {
  const { title, fontSize, count, margin, button } = props;
  return (
    <header className="header" style={{ margin }}>
      <div className="title-container">
        {button && <div className="button-container">{button}</div>}
        <h1 className="title" style={{ fontSize }}>
          {title}
        </h1>
        {count && <span className="count">{count}</span>}
      </div>
    </header>
  );
}
export { Header };
