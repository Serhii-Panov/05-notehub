import css from "./NoteList.module.css";
import type { Note } from "../../types/note";

interface NoteListProps {
  onSelect: (note: Note) => void;
  notes: Array<Note>;
}

export default function NoteList(props: NoteListProps) {
  return (
    <ul className={css.list}>
      {props.notes.map((note) => {
        return (
          <li
            key={note.id}
            className={css.listItem}
            onClick={() => props.onSelect(note)}
          >
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

