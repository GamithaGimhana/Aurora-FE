import { Link } from "react-router-dom";

/* ---------- Small UI Blocks ---------- */

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  to,
}: {
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group bg-white border rounded-xl p-6 hover:bg-slate-50 transition"
    >
      <h3 className="font-semibold text-lg group-hover:text-black">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {description}
      </p>
    </Link>
  );
}

/* ---------- Dashboard ---------- */

export default function LecturerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Lecturer Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your teaching materials and assessments
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Notes" value="0" />
          <StatCard title="Flashcards" value="0" />
          <StatCard title="Quizzes" value="0" />
          <StatCard title="Quiz Rooms" value="0" />
        </section>

        {/* Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Create & Manage
          </h2>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ActionCard
              title="Create Notes"
              description="Write structured study notes for students"
              to="/lecturer/notes/create"
            />

            <ActionCard
              title="Create Flashcards"
              description="Add flashcards to improve retention"
              to="/lecturer/flashcards/create"
            />

            <ActionCard
              title="Create Quiz"
              description="Build quizzes with multiple question types"
              to="/lecturer/quiz/create"
            />

            <ActionCard
              title="Create Quiz Room"
              description="Generate live quiz rooms for real-time sessions"
              to="/lecturer/rooms/create"
            />

            <ActionCard
              title="My Resources"
              description="Manage all your uploaded content"
              to="/lecturer/resources"
            />

            <ActionCard
              title="AI Content Generator"
              description="Generate notes, flashcards, and quizzes using AI"
              to="/ai/generate"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
