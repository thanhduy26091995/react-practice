import ListItem from "./ListItem";
import "../App.css";
import Nav from "./Nav";
import NavItem from "./NavItem";
import List from "./List";
import { useState } from "react";

const movies = [
  {
    id: 1,
    image:
      "https://tailwindcss.com/_next/static/media/prognosis-negative.6897ae50.jpg",
    title: "HAHAHA",
    startRating: 5,
    rating: 13,
    year: 2023,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach",
  },
  {
    id: 2,
    image:
      "https://tailwindcss.com/_next/static/media/prognosis-negative.6897ae50.jpg",
    title: "Gaming",
    startRating: 5,
    rating: 13,
    year: 2023,
    genre: "Comedy",
    runtime: "1h 46m",
    cast: "Simon Pegg, Zach",
  },
];

export default function MovieApp() {
  // State to keep track of the active NavItem
  const [activeItem, setActiveItem] = useState("/new");
  const handleNavClick = (href) => {
    setActiveItem(href);
  };

  return (
    <div className="divide-y divide-slate-100">
      <Nav>
        <NavItem
          href={activeItem}
          isActive={activeItem === "/new"}
          onClick={() => handleNavClick("/new")}
        >
          New Releases
        </NavItem>
        <NavItem
          href={activeItem}
          isActive={activeItem === "/top"}
          onClick={() => handleNavClick("/top")}
        >
          Top Rated
        </NavItem>
        <NavItem
          href={activeItem}
          isActive={activeItem === "/picks"}
          onClick={() => handleNavClick("/picks")}
        >
          New Picks
        </NavItem>
      </Nav>

      <List>
        {movies.map((movie) => (
          <ListItem key={movie.id} movie={movie} />
        ))}
      </List>
    </div>
  );
}
