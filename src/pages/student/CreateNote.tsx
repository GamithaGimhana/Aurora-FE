// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function CreateNote() {
//   const navigate = useNavigate();

//   const [topic, setTopic] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     if (topic) formData.append("topic", topic);
//     if (description) formData.append("description", description);
//     if (file) {
//       console.log("Attaching file:", file.name); // DEBUG
//       formData.append("file", file); // This key must match upload.single("file")
//     }

//     try {
//       await api.post("/ai/generate-notes", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       navigate("/student/notes");
//     } catch (err: any) {
//       if (err.response?.status === 429) {
//         alert("AI is over capacity. Please wait 60 seconds before trying again.");
//       } else {
//         alert("Failed to generate note");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Generate AI Note</h1>

//       <form onSubmit={handleGenerate} className="space-y-4">

//         <input
//           type="text"
//           placeholder="Topic (optional)"
//           className="w-full border p-3 rounded-lg"
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//         />

//         <textarea
//           placeholder="Describe what kind of note you want (optional)"
//           className="w-full border p-3 min-h-[150px] rounded-lg"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input
//           type="file"
//           accept=".pdf,.docx"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//         />

//         <button
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//         >
//           {loading ? "Generating..." : "Generate Note"}
//         </button>
//       </form>
//     </div>
//   );
// }
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
