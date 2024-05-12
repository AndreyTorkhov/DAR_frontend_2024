import "../styles/description.css";
import img_filter from "../img/filter.png";

function Description() {
  return (
    <div className="description">
      <div className="image-description">
        <img src={img_filter} alt="description" />
      </div>
      <p className="text">
        В нашей жизни, когда время становится все более ценным ресурсом, задача
        планирования приема пищи становится все более сложной.
        <br />
        <br />
        Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или
        ужин? Каким образом мы можем легко и быстро определиться с выбором блюда
        и не тратить много времени на принятие этого решения? <br />
        <br />
        Наш сервис поможет: выбирайте параметры - и вперед!
      </p>
    </div>
  );
}

export { Description };
