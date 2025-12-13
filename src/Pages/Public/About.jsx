const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <title>About Us | BloodLine</title>
      <h1 className="text-4xl font-bold text-center mb-6">
        About <span className="text-secondary">BloodLine</span>
      </h1>

      <p className="text-lg leading-relaxed mb-6 text-center">
        BloodLine is a community-driven blood donation platform designed to
        connect lifesavers with those in urgent need. Our goal is simple: No
        life should be lost due to the unavailability of blood.
      </p>

      {/* Mission Section */}
      <div className="p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          ❤️ Our Mission
        </h2>
        <p className="">
          To build a safe, fast, and reliable bridge between donors and
          recipients using technology, trusted data, and community support.
        </p>
      </div>

      {/* What We Do */}
      <div className="p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          🌍 What We Do
        </h2>
        <ul className="list-disc list-inside  space-y-1">
          <li>Connect verified donors with recipients in need</li>
          <li>Provide real-time donor availability</li>
          <li>Show donation history and request status</li>
          <li>Maintain secure and private data for all users</li>
        </ul>
      </div>

      {/* Why Us */}
      <div className="p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          🤝 Why BloodLine?
        </h2>
        <ul className="list-disc list-inside  space-y-1">
          <li>Fast and accurate donor matching</li>
          <li>Easy-to-use interface</li>
          <li>Verified donor information</li>
          <li>Emergency priority request system</li>
          <li>24/7 availability</li>
        </ul>
      </div>

      {/* Commitment */}
      <div className="p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          🔒 Our Commitment
        </h2>
        <p className="">
          We ensure complete privacy, transparency, and dedication in every
          feature. BloodLine exists solely to save lives—one donation at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
