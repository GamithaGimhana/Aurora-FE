import { useState } from "react";
import { createNote } from "../../services/notes";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async (e: any) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Both title and content are required");
      return;
    }

    try {
      await createNote({ title, content });
      alert("Note created!");
      navigate("/student/notes");
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Note</h1>

      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Note Title"
          className="w-full border p-3 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          className="w-full border p-3 min-h-[200px] rounded-lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
}
