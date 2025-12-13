const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <title>Contact Us | BloodLine</title>
      <h1 className="text-4xl font-bold text-center mb-8">
        Contact <span className="text-secondary">Us</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="p-6 rounded-xl space-y-4">
          <h2 className="text-2xl font-semibold mb-3">📩 Get in Touch</h2>

          <p>
            <strong>Email:</strong> support@bloodline.com
          </p>
          <p>
            <strong>Emergency Hotline:</strong> +880 1700-000000
          </p>

          <h3 className="text-xl font-semibold mt-4">📍 Our Office</h3>
          <p>Road 12, Sector 7</p>
          <p>Uttara, Dhaka – 1230</p>

          <h3 className="text-xl font-semibold mt-4">🕒 Support Hours</h3>
          <p>Sat – Thu: 9:00 AM – 10:00 PM</p>
          <p>Friday: Emergency Support Only</p>

          <h3 className="text-xl font-semibold mt-4">🌐 Social Media</h3>
          <p>Facebook: BloodLineBD</p>
          <p>Instagram: @bloodline.bd</p>
          <p>Twitter: @bloodlineBD</p>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-3">📝 Send us a message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32"
            ></textarea>

            <button className="btn btn-secondary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
