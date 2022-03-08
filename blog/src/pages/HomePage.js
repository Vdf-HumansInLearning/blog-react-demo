import { string } from "prop-types";
import React, { Component } from "react";
import Article from "../components/Article";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ToastAlert from "../components/ToastAlert/ToastAlert";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default class HomePage extends Component {
  constructor(props) {
    const indexSize = 4;
    super(props);
    this.state = {
      indexSize: indexSize,
      indexStart: 0,
      indexEnd: indexSize - 1,
      articles: [],
      totalNumberOfArticles: 0,
      isModalOpen: false,
      title: "",
      tag: "",
      author: "",
      date: "",
      imgUrl: "",
      saying: "",
      content: "",
      id: null,
      isDeleteModalOpen: false,
      isShowLoad: true,
      isToastShown: false,
      showSuccessMessage: false,
      showDeleteMessage: false,
      toastContent: "",
    };
    this.getArticles = this.getArticles.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.closeModalResetForm = this.closeModalResetForm.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.createNewArticle = this.createNewArticle.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.openToast = this.openToast.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }
  static propTypes = {
    second: string,
  };

  componentDidMount() {
    this.getArticles();
  }

  handleNext() {
    const { indexSize, indexStart, indexEnd } = this.state;
    this.setState(
      {
        indexStart: indexStart + indexSize,
        indexEnd: indexEnd + indexSize,
      },
      this.getArticles
    );
  }

  handlePrevious() {
    const { indexSize, indexStart, indexEnd } = this.state;
    this.setState(
      {
        indexStart: indexStart - indexSize,
        indexEnd: indexEnd - indexSize,
        //prima pagina este 0 si 3
        //a2a pagina este 4 si 4
        //nr de articole total 5
        //4 articole pe pagina
      },
      this.getArticles
    );
  }

  getArticles() {
    const { indexStart, indexEnd } = this.state;
    fetch(
      `http://localhost:3007/articles?indexStart=${indexStart}&indexEnd=${indexEnd}`
    )
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          response.json().then((data) => {
            this.setState({
              articles: data.articlesList,
              totalNumberOfArticles: data.numberOfArticles,
              isShowLoad: false,
            });
          });
        }.bind(this)
      )
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  createNewArticle(article) {
    const dateParsed = new Date(this.state.date);
    const today = new Date();

    let dd = String(dateParsed.getDate()).padStart(2, "0");
    let mm = dateParsed.toLocaleString("default", {
      month: "long",
    });
    let yyyy = dateParsed.getFullYear();

    let date = mm + " " + dd + ", " + yyyy;

    fetch("http://localhost:3007/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...article,
        imgUrl: article.imgUrl,
        imgAlt: "photo",
        date: date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.closeModalResetForm();
        if (dateParsed.getTime() <= today.getTime()) {
          this.getArticles();
          this.showToast("The article has been created!");
        } else {
          console.log("not possible");
        }
      })
      .catch((err) => console.log(err));
  }

  editArticle(article, id) {
    const dateParsed = new Date(this.state.date);
    let dd = String(dateParsed.getDate()).padStart(2, "0");
    let mm = dateParsed.toLocaleString("default", {
      month: "long",
    });
    let yyyy = dateParsed.getFullYear();

    let date = mm + " " + dd + ", " + yyyy;

    fetch("http://localhost:3007/articles/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...article,
        imgUrl: article.imgUrl,
        imgAlt: "photo",
        date: date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.closeModalResetForm();
        this.getArticles();
        this.showToast("This article has been successfully edited!");
      })
      .catch((err) => console.log(err));
  }

  showToast(toastContent) {
    this.setState({ isToastShown: true, toastContent: toastContent });
    setTimeout(
      () =>
        this.setState({
          isToastShown: false,
          showSuccessMessage: false,
          showDeleteMessage: false,
          toastContent: "",
        }),
      5000
    );
  }

  openToast(option) {
    if (option === "success") {
      this.setState({ showSuccessMessage: true });
    }
    if (option === "delete") {
      this.setState({ showDeleteMessage: true });
    }
  }

  openAddModal() {
    this.setState({ isModalOpen: true });
  }

  closeModalResetForm() {
    this.setState({
      isModalOpen: false,
      title: "",
      tag: "",
      author: "",
      date: "",
      imgUrl: "",
      saying: "",
      content: "",
      id: null,
    });
  }
  closeDeleteModal() {
    this.setState({
      isDeleteModalOpen: false,
      id: null,
    });
  }

  handleChangeInput(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  openEditModal(article) {
    this.openAddModal();
    this.setState({
      id: article.id,
      title: article.title,
      tag: article.tag,
      author: article.author,
      date: article.date,
      imgUrl: article.imgUrl,
      saying: article.saying,
      content: article.content,
    });
  }

  openDeleteModal(id) {
    this.setState({
      isDeleteModalOpen: true,
      id: id,
    });
  }

  deleteArticle() {
    const articleId = this.state.id;
    if (!articleId) {
      return;
    }
    fetch("http://localhost:3007/articles/" + articleId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        this.getArticles();
        this.closeDeleteModal();
        this.showToast("The article has been successfully deleted!");
      })
      .catch((error) => {
        this.getArticles();
        this.closeDeleteModal();
        console.error("Error:", error);
      });
  }

  handleSelectedFile(event) {
    this.setState({
      imgUrl: event.target.files[0].name,
    });
  }

  render() {
    const {
      totalNumberOfArticles,
      articles,
      indexStart,
      indexEnd,
      id,
      isShowLoad,
      title,
      tag,
      author,
      date,
      imgUrl,
      saying,
      content,
      showSuccessMessage,
      showDeleteMessage,
      isToastShown,
      toastContent,
    } = this.state;

    const filteredArticles = articles.map((article) => (
      <Article
        article={article}
        key={article.id}
        editArticle={this.openEditModal}
        deleteArticle={this.openDeleteModal}
        isDetails={false}
      />
    ));
    const isPrevious = indexStart === 0 ? false : true;
    const isNext = totalNumberOfArticles - 1 > indexEnd ? true : false;
    // 4 articole/pag si 5 articole in total => indexStart = 0 & indexEnd = 3

    if (isShowLoad) {
      return <Loader />;
    }

    return (
      <>
        <ToastAlert
          showSuccessMessage={showSuccessMessage}
          showDeleteMessage={showDeleteMessage}
          isToastShown={isToastShown}
          toastContent={toastContent}
        />
        <div>
          <div className="add__container">
            <button
              type="button"
              className="button open-modal fas fa-plus"
              onClick={() => this.openAddModal()}
            >
              Add Article
            </button>
          </div>
        </div>
        {filteredArticles}
        <Footer
          handleNext={this.handleNext}
          handlePrevious={this.handlePrevious}
          isNext={isNext}
          isPrevious={isPrevious}
        />
        <div
          id="modal-box"
          className={
            this.state.isModalOpen
              ? "modal__overlay modal__overlay--open"
              : "modal__overlay"
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
                  console.log(values);
                  const errors = {};
                  const regexJpg = /\.(jpe?g|png|gif|bmp)$/i;
                  const upperCaseLetter =
                    /([A-Z]{1})([a-z]+)(\s)([A-Z]{1})([a-z]+){1}(|\s)$/g;
                  if (!values.title) {
                    errors.title = "Please insert the title of your article!";
                  } else if (values.title.length < 5) {
                    errors.title =
                      "The title must be at least 5 characters long!";
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
                    errors.content =
                      "Please insert the content of your article!";
                  }

                  if (this.state.isModalOpen === false) {
                    console.log("apelata");
                  }
                  return errors;
                }}
                onSubmit={(values) => {
                  const { id } = this.state;
                  if (id) {
                    this.editArticle(values, id);
                  } else {
                    this.createNewArticle(values);
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
                            ? "input margin input__fail"
                            : "input margin"
                          // ? (!errors.title && touched.title
                          //   ? "input margin input__success"
                          //   : "input margin")
                          // : null
                        }
                        placeholder="Please enter the title"
                        value={title}
                        onChange={this.handleChangeInput}
                      />
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
                            ? "input input__fail"
                            : "input"
                        }
                        placeholder="Please enter tag"
                        value={tag}
                        onChange={this.handleChangeInput}
                      />
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
                            ? "input margin input__fail"
                            : "input margin"
                        }
                        placeholder="Please enter the author"
                        value={author}
                        onChange={this.handleChangeInput}
                      />
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
                            ? "input input__fail"
                            : "input"
                        }
                        placeholder="Please choose the date"
                        value={date}
                        onChange={this.handleChangeInput}
                        // format="MMMM dd, yyyy"
                        // pattern="\d{4}-\d{2}-\d{2}"
                        // min={new Date()}

                        // locale="ro"
                      />

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
                            ? "input margin input__fail"
                            : "input margin"
                        }
                        placeholder="Please enter the image url"
                        style={{ fontSize: 14, paddingTop: 5 }}
                        onChange={(event) => this.handleSelectedFile(event)}
                      />
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
                            ? "input input__fail"
                            : "input"
                        }
                        placeholder="Please enter the saying"
                        value={saying}
                        onChange={this.handleChangeInput}
                      />
                      <ErrorMessage
                        name="saying"
                        component="div"
                        className="input__error"
                      />
                    </div>

                    <div>
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
                        value={content}
                        onChange={this.handleChangeInput}
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="input__error"
                      />
                    </div>
                    <div className="modal__buttons">
                      <button
                        type="button"
                        className="button close-modal"
                        onClick={this.closeModalResetForm}
                      >
                        Cancel
                      </button>
                      {id === null ? (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="button button--pink"
                          onClick={() => this.openToast("success")}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="button button--pink"
                          onClick={() => this.openToast("success")}
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
        <div
          id="modal-alert"
          className={
            this.state.isDeleteModalOpen
              ? "modal__overlay modal__overlay--open"
              : "modal__overlay"
          }
        >
          <div id="div-modal-alert" className="add-modal add-modal--small">
            <div className="modal__content">
              <div className="alert-container">
                <h1 className="title modal-title">Delete Article</h1>
                <p className="alert-delete-p">
                  Are you sure you want to delete this article?
                </p>
                <div className="clearfix">
                  <button
                    type="button"
                    className="button cancel-alert-button"
                    onClick={this.closeDeleteModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="delete-alert-button"
                    onClick={() => {
                      this.deleteArticle();
                      this.openToast("delete");
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
