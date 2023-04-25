export default function popUp({ message, timeOut }) {
  return (
    <div className="fixed top-[5 %] right-[50%] translate-x-[50%] p-2 bg-red-400">
      <span>{message}</span>
    </div>
  );
}
