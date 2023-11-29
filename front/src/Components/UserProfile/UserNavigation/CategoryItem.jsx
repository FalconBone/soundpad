import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function CategoryItem(props) {

    return (
      <NavLink to={`/category?id=${props.id}`}>
        {props.name}
      </NavLink>
    );
  }
  