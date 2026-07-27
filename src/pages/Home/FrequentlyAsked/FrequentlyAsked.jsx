const FrequentlyAsked = () => {
  return (
    <div className="text-center my-10">
      <h3 className="text-3xl font-bold text-secondary">
        Frequently Asked Question (FAQ)
      </h3>
      <p className="text-gray-500">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce <br /> pain, and strengthen your body
        with ease!
      </p>

      {/* box */}
      <div className="my-10 mx-5">
        <div className="collapse collapse-arrow has-checked:bg-[#067A87]/20 border border-[#067A87]">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div className="collapse collapse-arrow has-checked:bg-[#067A87]/20 border border-[#067A87]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div className="collapse collapse-arrow has-checked:bg-[#067A87]/20 border border-[#067A87]">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>

      <button className="btn bg-primary text-secondary rounded-3xl">
        See More FAQ’s
      </button>
    </div>
  );
};

export default FrequentlyAsked;
