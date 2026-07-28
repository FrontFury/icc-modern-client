import { useState } from "react";

const JoinCommunity = () => {
    const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="w-full bg-[#055be0] py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Side Text Content */}
        <div className="max-w-xl text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Ready to join our community?
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            Subscribe to our newsletter to receive the latest academic news, event
            updates, and admission alerts directly in your inbox.
          </p>
        </div>

        {/* Right Side Subscription Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full sm:w-80 md:w-96 px-4 py-3.5 bg-white rounded-md text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#121929] hover:bg-black text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default JoinCommunity;