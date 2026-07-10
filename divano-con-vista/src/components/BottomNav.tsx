type Props = {
  activePage: string;
  setActivePage: (page: string) => void;
};

function BottomNav({ activePage, setActivePage }: Props) {
  const items = [
    { id: "home", label: "Home" },
    { id: "discover", label: "Scopri" },
    { id: "search", label: "Cerca" },
    { id: "library", label: "Libreria" },
    { id: "profile", label: "Profilo" },
  ];

  return (
    <nav className="bottomNav">
      {items.map((item) => (
        <button
          key={item.id}
          className={activePage === item.id ? "active" : ""}
          onClick={() => setActivePage(item.id)}
        >
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;