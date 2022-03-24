import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FileInput from "./FileInput";

export default function AddArticleModal({
  isModalOpen,
  id,
  title,
  tag,
  author,
  date,
  imgUrl,
  saying,
  content,
  createNewArticle,
  editArticle,
  closeModalResetForm,
  openToast,
}) {
  const supportedFormats = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
    "image/bmp",
  ];
  const upperCaseLetter = /([A-Z]{1})([a-z]+)(\s)([A-Z]{1})([a-z]+){1}(|\s)$/g;
  const yupValidation = Yup.object({
    title: Yup.string()
      .min(5, "The title must be at least 5 characters long")
      .required("Please enter the title if your article"),
    tag: Yup.string()
      .max(30, "Please keep your tag under 30 characters!")
      .required("Please enter the tag of your article!"),
    author: Yup.string()
      .required("Please enter the author of your article!")
      .matches(
        upperCaseLetter,
        "Please use capital letters for the author's first and last name!"
      ),
    date: Yup.string().required("Please choose a date"),
    imgUrl: Yup.mixed()
      .required("Please choose an image")
      .test(
        "fileFormat",
        "Please insert an image with jpg/jpeg/png/bmp/gif extension!",
        (value) => value && supportedFormats.includes(value.type)
      ),
    saying: Yup.string().required(
      "Please enter the main saying of your article"
    ),
    content: Yup.string().required("Please enter the content of your article"),
  });
  return (
    <div
      className={
        isModalOpen ? "modal__overlay modal__overlay--open" : "modal__overlay"
      }
    >
      <div className="modal__container">
        <h2 className="title title--modal">Add/Edit article</h2>
        <Formik
          enableReinitialize
          initialValues={{
            title,
            tag,
            author,
            date,
            imgUrl,
            saying,
            content,
          }}
          validationSchema={yupValidation}
          onSubmit={(values) => {
            if (id) {
              editArticle(values, id);
            } else {
              createNewArticle(values);
            }
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, values }) => (
            <Form className="inputs__container">
              <div className="input__mb">
                <Field
                  type="text"
                  name="title"
                  className={
                    errors.title && touched.title
                      ? "input input__fail  "
                      : "input"
                  }
                  placeholder="Please enter the title"
                />
                <i
                  className={
                    errors.title && touched.title ? "icon-cancel-circled" : ""
                  }
                ></i>

                <ErrorMessage
                  name="title"
                  component="div"
                  className="input__error"
                />
              </div>
              <div className="input__mb">
                <Field
                  type="text"
                  name="tag"
                  className={
                    errors.tag && touched.tag ? "input input__fail" : "input"
                  }
                  placeholder="Please enter tag"
                />
                <i
                  className={
                    errors.tag && touched.tag ? "icon-cancel-circled" : ""
                  }
                ></i>
                <ErrorMessage
                  name="tag"
                  component="div"
                  className="input__error"
                />
              </div>
              <div className="input__mb">
                <Field
                  type="text"
                  name="author"
                  className={
                    errors.author && touched.author
                      ? "input input__fail"
                      : "input"
                  }
                  placeholder="Please enter the author"
                />
                <i
                  className={
                    errors.author && touched.author ? "icon-cancel-circled" : ""
                  }
                ></i>
                <ErrorMessage
                  name="author"
                  component="div"
                  className="input__error"
                />
              </div>
              <div className="input__mb">
                <Field
                  type="date"
                  name="date"
                  className={
                    errors.date && touched.date ? "input input__fail" : "input"
                  }
                  placeholder="Please choose the date"
                />
                <i
                  className={
                    errors.date && touched.date ? "icon-cancel-circled" : ""
                  }
                ></i>
                <ErrorMessage
                  name="date"
                  component="div"
                  className="input__error"
                />
              </div>
              <div className="input__mb">
                <div className="input__upload">
                  <Field
                    type="file"
                    name="imgUrl"
                    component={FileInput}
                    onChange={handleChange}
                    className="input input__file"
                  />
                  {id === null ? (
                    <input
                      disabled
                      placeholder={
                        values.imgUrl ? values.imgUrl.name : "No File Chosen"
                      }
                      className={
                        errors.imgUrl && touched.imgUrl
                          ? "input__data input__fail"
                          : "input__data"
                      }
                    />
                  ) : (
                    <input
                      disabled
                      placeholder={
                        String(values.imgUrl.name).includes("img/")
                          ? String(values.imgUrl.name).replace("img/", "")
                          : values.imgUrl.name
                      }
                      className={
                        errors.imgUrl && touched.imgUrl
                          ? "input__data input__fail"
                          : "input__data"
                      }
                    />
                  )}
                  <button type="submit" className="input__button">
                    Choose File
                  </button>
                  <i
                    className={
                      errors.imgUrl && touched.imgUrl
                        ? "icon-cancel-circled"
                        : ""
                    }
                  ></i>
                </div>
                <ErrorMessage
                  name="imgUrl"
                  component="div"
                  className="input__error input__error--file"
                />
              </div>
              <div className="input__mb">
                <Field
                  type="text"
                  name="saying"
                  className={
                    errors.saying && touched.saying
                      ? "input input__fail"
                      : "input"
                  }
                  placeholder="Please enter the saying"
                />
                <i
                  className={
                    errors.saying && touched.saying ? "icon-cancel-circled" : ""
                  }
                ></i>

                <ErrorMessage
                  name="saying"
                  component="div"
                  className="input__error"
                />
              </div>

              <div className="input__mb">
                <Field
                  type="text"
                  name="content"
                  as="textarea"
                  className={
                    errors.content && touched.content
                      ? "textarea input__fail"
                      : "textarea"
                  }
                  cols="28"
                  rows="10"
                  placeholder="Please enter content"
                />
                <i
                  className={
                    errors.content && touched.content
                      ? "icon-cancel-circled"
                      : ""
                  }
                ></i>
                <ErrorMessage
                  name="content"
                  component="div"
                  className="input__error"
                />
              </div>
              <div className="modal__buttons">
                <button
                  type="button"
                  className="button"
                  onClick={closeModalResetForm}
                >
                  Cancel
                </button>
                {id === null ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button--pink"
                    onClick={() => openToast("success")}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button button--pink"
                    onClick={() => openToast("success")}
                  >
                    Edit
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
