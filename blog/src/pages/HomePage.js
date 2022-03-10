import { string } from "prop-types";
import React, { Component } from "react";
import Article from "../components/Article";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ToastAlert from "../components/ToastAlert/ToastAlert";
import AddArticleModal from "../components/AddArticleModal";

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
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
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
      isShowLoad,
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

        {this.state.isModalOpen &&  <AddArticleModal
          isModalOpen={this.state.isModalOpen}
          id={this.state.id}
          title={this.state.title}
          tag={this.state.tag}
          author={this.state.author}
          date={this.state.date}
          imgUrl={this.state.imgUrl}
          saying={this.state.saying}
          content={this.state.content}
          createNewArticle={this.createNewArticle}
          editArticle={this.editArticle}
          handleChangeInput={this.handleChangeInput}
          handleSelectedFile={this.handleSelectedFile}
          openToast={this.openToast}
          closeModalResetForm={this.closeModalResetForm}
        />}
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
