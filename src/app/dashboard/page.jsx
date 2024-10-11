'use client';
export default function Dashboard() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to your Dashboard!</h1>
        <p className="text-gray-500 mt-4">You are successfully logged in.</p>
      </div>
    </div>
  );
}
