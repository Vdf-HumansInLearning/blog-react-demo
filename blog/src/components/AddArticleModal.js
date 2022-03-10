import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

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
  handleChangeInput,
  handleSelectedFile,
  closeModalResetForm,
  openToast,
}) {
  return (
    <div
      id="modal-box"
      className={
        isModalOpen ? "modal__overlay modal__overlay--open" : "modal__overlay"
      }
    >
      <div className="add-modal">
        <div className="modal__content">
          <h2 className="title modal-title">Add/Edit article</h2>

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
            validate={(values) => {
              const errors = {};
              const regexJpg = /\.(jpe?g|png|gif|bmp)$/i;
              const upperCaseLetter =
                /([A-Z]{1})([a-z]+)(\s)([A-Z]{1})([a-z]+){1}(|\s)$/g;
              if (!values.title) {
                errors.title = "Please insert the title of your article!";
              } else if (values.title.length < 5) {
                errors.title = "The title must be at least 5 characters long!";
              }
              if (!values.tag) {
                errors.tag = "Please insert the tag of your article!";
              }
              if (values.tag.length > 30) {
                console.log(values.tag);
                errors.tag = "Please keep your tag under 30 characters!";
              }
              if (!values.author) {
                errors.author = "Please insert the author of your article!";
              } else if (!upperCaseLetter.test(values.author)) {
                errors.author =
                  "Please use capital letters for the author's first and last name!";
              }
              if (!values.date) {
                errors.date = "Please choose a date!";
              }
              if (!values.imgUrl) {
                errors.imgUrl = "Please insert an image url!";
              } else if (!regexJpg.test(values.imgUrl)) {
                errors.imgUrl =
                  "Please insert an image with jpg/jpeg/png/bmp/gif extension!";
              }
              if (!values.saying) {
                errors.saying =
                  "Please insert the main saying of your article!";
              }
              if (!values.content) {
                errors.content = "Please insert the content of your article!";
              }

              return errors;
            }}
            onSubmit={(values) => {
              //   const { id } = this.state;
              if (id) {
                editArticle(values, id);
              } else {
                createNewArticle(values);
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
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
                    value={title}
                    onChange={handleChangeInput}
                  />
                  <i className={
                    errors.title && touched.title
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>

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
                      errors.tag && touched.tag
                        ? "input input__fail" : "input"
                    }
                    placeholder="Please enter tag"
                    value={tag}
                    onChange={handleChangeInput}
                  />
                  <i className={
                    errors.tag && touched.tag
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>
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
                        ? "input input__fail" : "input"
                    }
                    placeholder="Please enter the author"
                    value={author}
                    onChange={handleChangeInput}
                  />
                  <i className={
                    errors.author && touched.author
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>
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
                      errors.date && touched.date
                        ? "input input__fail" : "input"
                    }
                    placeholder="Please choose the date"
                    value={date}
                    onChange={handleChangeInput}
                  // format="MMMM dd, yyyy"
                  // pattern="\d{4}-\d{2}-\d{2}"
                  // min={new Date()}

                  // locale="ro"
                  />
                  <i className={
                    errors.date && touched.date
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="input__error"
                  />
                </div>
                <div className="input__mb">
                  <input
                    type="file"
                    name="imgUrl"
                    className={
                      errors.imgUrl && touched.imgUrl
                        ? "input input__fail" : "input"
                    }
                    placeholder="Please enter the image url"
                    onChange={(event) => handleSelectedFile(event)}
                  />
                  <i className={
                    errors.imgUrl && touched.imgUrl
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>
                  <ErrorMessage
                    name="imgUrl"
                    component="div"
                    className="input__error"
                  />
                </div>
                <div className="input__mb">
                  <Field
                    type="text"
                    name="saying"
                    className={
                      errors.saying && touched.saying
                        ? "input input__fail" : "input"
                    }
                    placeholder="Please enter the saying"
                    value={saying}
                    onChange={handleChangeInput}
                  />
                  <i className={
                    errors.saying && touched.saying
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>

                  <ErrorMessage
                    name="saying"
                    component="div"
                    className="input__error"
                  />
                </div>

                <div className="textarea-div">
                  <Field
                    type="text"
                    name="content"
                    as="textarea"
                    className={
                      errors.content && touched.content
                        ? "textarea input__fail" : "textarea"
                    }
                    cols="28"
                    rows="10"
                    placeholder="Please enter content"
                    value={content}
                    onChange={handleChangeInput}
                  />
                  <i className={
                    errors.content && touched.content
                      ? "icon-cancel-circled  " : ""
                  }
                  >
                  </i>
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
        <div id="error-modal"></div>
      </div>
    </div>
  );
}
