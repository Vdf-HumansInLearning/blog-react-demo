import React from "react";

export default function FileInput({ form, field }) {
  function handleImageChange(e) {
    let img = e.target.files[0];
    form.setTouched({ ...form.touched, [field.name]: true });
    if (img) {
      form.setFieldValue(field.name, img);
    }
  }

  return (
    <input
      type="file"
      name={field.name}
      className="input input__file"
      placeholder="Please enter the image url!"
      onChange={handleImageChange}
    />
  );
}
