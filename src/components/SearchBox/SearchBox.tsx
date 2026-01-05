import css from "./SearchBox.module.css"
import toast from "react-hot-toast";
interface SearchBarProps {
  onSubmit: (query: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query === "") {
      toast.error("Please enter your search query");
      return;
    }
    onSubmit(query);
  };
  return (
      <div>
        {" "}
        <form action={handleSubmit}>
          {" "}
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />{" "}
        </form>{" "}
      </div>
  );
}
