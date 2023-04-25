import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function ProductQuantity({
  quantity,
  setQuantity,
  isMultiple,
  customDecrement,
  customIncrement,
}) {
  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const increaseQuantity = () => {
    if (quantity === 10) return;
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <FaAngleLeft
        onClick={isMultiple ? customDecrement : decreaseQuantity}
        className="inline-block text-3xl"
      />
      <input
        value={quantity}
        type="number"
        onChange={changeQuantity}
        disabled={isMultiple ? isMultiple : false}
        className="focus:outline-none inline-blick w-[20%] border-2 border-black"
      />
      <FaAngleRight
        onClick={isMultiple ? customIncrement : increaseQuantity}
        className="inline-block text-3xl"
      />
    </div>
  );
}
