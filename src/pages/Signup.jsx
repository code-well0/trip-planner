// import React, { useState } from "react";

// function SignupForm() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const validate = () => {
//     const newErrors = {};

//     if (!form.name.trim()) {
//       newErrors.name = "Name is required.";
//     } else if (form.name.length < 3) {
//       newErrors.name = "Name must be at least 3 characters.";
//     }

//     if (!form.email) {
//       newErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Email is invalid.";
//     }

//     if (!form.password) {
//       newErrors.password = "Password is required.";
//     } else if (form.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prevForm => ({
//       ...prevForm,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     console.log("Validation Errors:", validationErrors);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       setIsSubmitted(true);
//       console.log("Form submitted successfully:", form);
//     } else {
//       setIsSubmitted(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
//         <br />

//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
//         <br />

//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//           />
//         </label>
//         {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
//         <br />

//         <button type="submit">Signup</button>

//         {isSubmitted && (
//           <p style={{ color: "green" }}>Form Submitted successfully!</p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default SignupForm;


import React, { useState } from "react";

function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug
    const validationErrors = validate();
    console.log("Validation Errors:", validationErrors); // Debug
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form submitted successfully:", form);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        <br />

        <button type="submit">Signup</button>

        {isSubmitted && (
          <p style={{ color: "green" }}>Form Submitted successfully!</p>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
