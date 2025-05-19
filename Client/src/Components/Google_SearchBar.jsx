import { FcGoogle } from "react-icons/fc";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Google_SearchBar() {
  return (
    <form
      action="https://www.google.com/search"
      className="google_searchBar_container"
      method="get"
      name="searchform"
      target="_blank"
    >
      <div className="searchBar_wrapper">
        <div className="icon-left">
          <FcGoogle />
        </div>
        <input
          autoComplete="on"
          id="searchBar_input"
          name="q"
          placeholder="Sök..."
          required
          type="text"
        />
        <button type="submit" className="icon-right" aria-label="Search">
          <FaMagnifyingGlass />
        </button>
      </div>
    </form>
  );
}
