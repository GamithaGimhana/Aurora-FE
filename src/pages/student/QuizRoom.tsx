import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getRoomById, startQuiz } from "../../services/quizRoom"; 

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const TimerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-400 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-1 text-indigo-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const BoltIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-1 text-amber-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

const ExclamationTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-amber-500 mb-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.612-3.125 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
    </svg>
);

// --- Formatter ---
const formatDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

export default function QuizRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  // State
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);

  // Fetch Room Data
  const loadRoom = useCallback(async () => {
    if (!roomId) return;
    setLoading(true);
    setError("");
    setAccessDenied(false);

    try {
      const res = await getRoomById(roomId); 
      setRoom(res.data.data || res.data);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 403 || err.response?.status === 401) {
         setAccessDenied(true);
         setError(err.response.data.message || "Access Restricted");
      } else {
        setError(err.response?.data?.message || "Failed to load room details.");
      }
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    loadRoom();
  }, [loadRoom]);


  // Handle Start Logic
  const handleStartQuiz = async () => {
    setStarting(true);
    setError("");
    try {
      const res = await startQuiz(roomId!); 
      const payload = res.data;
      const attemptId = payload.attempt?._id || payload.attempt?.id || payload.data?.attempt?._id;
      navigate(`/student/attempt/${attemptId}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to start quiz.";
      setError(msg);
      setStarting(false);
      // If error suggests room is closed/limited, reload to update UI
      if (err.response?.status === 403 || err.response?.status === 400) {
         loadRoom(); 
      }
    }
  };

  // --- Render: Loading ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
         <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
         </div>
      </div>
    );
  }

  // --- Render: Access Denied ---
  if (accessDenied) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center border border-gray-100">
                <div className="flex justify-center">
                    <LockClosedIcon />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                <p className="text-gray-600 mb-8">
                    {error || "This is a private room. You may need to join via code first."}
                </p>
                <Link to="/student/rooms/available" className="block w-full py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition">
                    Back to Quiz Hub
                </Link>
            </div>
        </div>
      );
  }

  if (!room) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">Room not found</h2>
                <Link to="/student/rooms/available" className="mt-4 inline-block text-indigo-600 hover:underline">Return Home</Link>
            </div>
        </div>
      );
  }

  // --- Logic: Determine Room Status ---
  const now = new Date();
  const startsAt = room.startsAt ? new Date(room.startsAt) : null;
  const endsAt = room.endsAt ? new Date(room.endsAt) : null;

  const attemptsMade = room.currentAttempts || room.attemptsCount || 0; 
  const maxAttempts = room.maxAttempts || 1;

  const isLockedManual = !room.active;
  const isUpcoming = startsAt && now < startsAt;
  const isEnded = endsAt && now > endsAt;
  const isAttemptsExhausted = attemptsMade >= maxAttempts;
  
  // Strict block logic
  const canStart = !isLockedManual && !isUpcoming && !isEnded && !isAttemptsExhausted;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 md:left-12 z-20">
        <Link to="/student/rooms/available" className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm text-gray-600 hover:text-gray-900 transition font-medium">
           <ChevronLeft /> Back
        </Link>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative z-10">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-900 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-white/10">
                            {room.visibility}
                        </span>
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                            <TimerIcon />
                            {room.timeLimit} Minutes
                        </div>
                    </div>
                    
                    {/* NEW: Leaderboard Icon Link */}
                    <Link 
                        to={`/student/rooms/${roomId}/leaderboard`} 
                        className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition border border-white/10"
                        title="View Leaderboard"
                    >
                        <TrophyIcon className="w-5 h-5 text-yellow-300" />
                    </Link>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{room.quiz?.title}</h1>
                <p className="text-indigo-100 text-lg leading-relaxed opacity-90 font-light">
                    {room.quiz?.description || "No description provided."}
                </p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-gray-100 bg-white">
             <div className="p-6 text-center border-r border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition">
                 <DocumentIcon />
                 <div className="text-xl font-bold text-gray-900">{room.quiz?.questions?.length || 0}</div>
                 <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">Questions</div>
             </div>
             
             <div className="p-6 text-center border-r border-gray-100 flex flex-col items-center justify-center hover:bg-gray-50 transition">
                 <BoltIcon />
                 <div className="text-xl font-bold text-gray-900 flex items-center gap-1">
                    <span className={isAttemptsExhausted ? "text-amber-500" : "text-green-600"}>
                        {attemptsMade}
                    </span>
                    <span className="text-gray-400 text-base font-medium">/ {maxAttempts}</span>
                 </div>
                 <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">Attempts Used</div>
             </div>

             <div className="p-6 text-center border-r border-gray-100 col-span-2 sm:col-span-2 flex flex-col justify-center items-center hover:bg-gray-50 transition">
                 {startsAt ? (
                    <div className="text-sm text-gray-900">
                        <span className="block font-bold text-gray-500 text-xs uppercase mb-1">Window</span>
                        {formatDate(room.startsAt)} <span className="text-gray-400 mx-1">to</span> 
                        <br className="sm:hidden"/>
                        {room.endsAt ? formatDate(room.endsAt) : "Forever"}
                    </div>
                 ) : (
                    <div className="text-gray-500 font-medium">Always Available</div>
                 )}
             </div>
        </div>

        {/* Action Section */}
        <div className="p-8 bg-gray-50/50">
            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-start gap-3 border border-red-100 animate-fadeIn">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                        <span className="font-bold block">Unable to start</span>
                        {error}
                    </div>
                </div>
            )}

            {/* Render different states based on conditions */}
            {isLockedManual ? (
                <div className="bg-gray-200 text-gray-600 py-6 rounded-xl text-center font-bold border border-gray-300 shadow-inner flex flex-col items-center">
                    <span className="text-2xl mb-2">🔒</span>
                    Room is currently locked by the instructor.
                </div>
            ) : isUpcoming ? (
                 <div className="bg-blue-50 text-blue-700 py-6 rounded-xl text-center border border-blue-100 shadow-sm">
                    <div className="text-xl font-bold mb-1">📅 Quiz Starts Soon</div>
                    <div className="text-sm opacity-80">Please wait until {formatDate(room.startsAt)}</div>
                </div>
            ) : isEnded ? (
                // TIME ENDED STATE
                <div className="bg-red-50 text-red-700 py-6 px-4 rounded-xl text-center border border-red-100 shadow-sm flex flex-col items-center">
                   <div className="bg-red-100 p-2 rounded-full mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                   </div>
                   <div className="font-bold text-lg">Quiz Has Ended</div>
                   <div className="text-sm mt-1 opacity-90 max-w-xs">
                       The time window for this quiz has closed. You can no longer access this assessment.
                   </div>
               </div>
            ) : isAttemptsExhausted ? (
                // MAX ATTEMPTS REACHED STATE
                <div className="bg-amber-50 text-amber-800 py-6 px-4 rounded-xl text-center border border-amber-100 shadow-sm flex flex-col items-center">
                    <ExclamationTriangleIcon />
                    <div className="font-bold text-lg">Maximum Attempts Reached</div>
                    <div className="text-sm mt-1 opacity-90 max-w-xs">
                        You have used all <strong>{maxAttempts}</strong> allowed attempts for this quiz.
                    </div>
                    <Link to="/student/dashboard" className="mt-4 text-xs font-bold underline hover:text-amber-900">
                        Return to Dashboard
                    </Link>
                </div>
            ) : (
                // ALLOWED STATE
                <>
                <button
                    onClick={handleStartQuiz}
                    disabled={starting}
                    className="w-full bg-black hover:bg-gray-900 text-white text-lg font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                    {starting ? (
                        <>
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Starting Quiz...
                        </>
                    ) : (
                        <>
                            <span>Start Quiz Attempt</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </>
                    )}
                </button>
                {canStart && (
                    <p className="text-center text-xs text-gray-400 mt-4">
                        ⚠️ The timer begins immediately after clicking Start.
                    </p>
                )}
                </>
            )}
            
            {/* NEW: Explicit Leaderboard Link Button at Bottom */}
            <Link 
                to={`/student/rooms/${roomId}/leaderboard`}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:text-indigo-600 transition shadow-sm group"
            >
                <TrophyIcon className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                View Leaderboard
            </Link>

        </div>
      </div>
    </div>
  );
}