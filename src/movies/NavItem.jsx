export default function NavItem({ href, isActive, onClick, children }) {
  return (
    <li>
      <a
        className={`block px-3 py-2 to-white rounded-md ${isActive ? "bg-sky-500 text-white" : "bg-slate-50 text-black"} hover:text-white`}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {children}
      </a>
    </li>
  );
}
