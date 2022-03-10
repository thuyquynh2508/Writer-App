const filePage = document.querySelector(".file-page");
const recentPage = document.querySelector(".recent-page");

const fileContent = document.getElementById("text");
const fileList = document.querySelector(".file-recent");
const inputName = document.querySelector(".file-info__name-text");

const fileOption = document.querySelector(".file-bar__file-option");
const returnBtn = document.querySelector(".recent-nav__return");
const saveBtn = document.querySelector(".file-option__save");
const newBtn = document.querySelector(".file-option__new");
const renameBtn = document.querySelector(".file-option__rename");
const deleteBtn = document.querySelector(".file-option__delete");
const detailBtn = document.querySelector(".file-option__detail");
//var downloadBtn = document.getElementById("download");
const downloadBtn = document.querySelector(".file-option__download");
const downloadLink = document.getElementById("download");
const detailModal = document.querySelector(".detail-modal-container");
const detailBody = document.querySelector(".detail-modal__body");
const closeModal = document.querySelector(".detail-modal__close");
const modalContainer = document.querySelector(".detail-modal-container");

const menuRecent = document.getElementsByClassName(
  "file-recent-heading__menu-list"
);
const menuRecentBtns = document.querySelectorAll(
  ".file-recent-heading__menu-detail"
);
const recentWrap = document.querySelector(".file-recent-heading__menu");
removeHash();
showNewFile();
showRecentList();

returnBtn.addEventListener("click", showFilePage);
window.addEventListener("hashchange", function () {
  showRecentPage();
});

newBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showNewFile();
  showRecentList();
});

saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let fileArr = getFileList();
  let openIndex = this.getAttribute("indexSave");
  let fileIndex;
  if (openIndex == 0 || openIndex) {
    fileIndex = openIndex;
  } else {
    fileIndex = fileArr.length - 1;
  }
  fileArr[fileIndex].name = inputName.value;
  fileArr[fileIndex].content = CKEDITOR.instances.text.getData();
  fileArr[fileIndex].timeLastModified = TimeStr();
  localStorage.setItem("New file", JSON.stringify(fileArr));
  showRecentList();
});

renameBtn.addEventListener("click", function () {
  let fileArr = getFileList();
  let renameIndex = this.getAttribute("indexRename");
  let fileIndex;
  if (renameIndex == 0 || renameIndex) {
    fileIndex = renameIndex;
  } else {
    fileIndex = fileArr.length - 1;
  }
  document.getElementById("name-input").focus();
  document.getElementById("name-input").select();
  inputName.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      fileArr[fileIndex].name = inputName.value;
      localStorage.setItem("New file", JSON.stringify(fileArr));
      showRecentList();
    }
  });
});

document.getElementById("name-input").addEventListener("focus", function () {});
deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let fileArr = getFileList();
  let deleteIndex = this.getAttribute("indexDelete");
  fileArr.splice(deleteIndex, 1);
  localStorage.setItem("New file", JSON.stringify(fileArr));
  this.removeAttribute("indexDelete");
  showRecentList();
  showRecentPage();
});

detailBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let fileArr = getFileList();
  let detailIndex = this.getAttribute("indexDetail");
  let fileIndex;
  if (detailIndex == 0 || detailIndex) {
    fileIndex = detailIndex;
  } else {
    fileIndex = fileArr.length - 1;
  }
  let detailFile = `<div class="detail-modal__section">
    <h3 class="detail-modal__section-header">Properties</h3>
    <ul class="detail-modal__section-body">
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Name</p>
        <p class="detail-modal__item-content">${fileArr[fileIndex].name}</p>
      </li>
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Comment</p>
        <p class="detail-modal__item-content">Javascript</p>
      </li>
    </ul>
  </div>
  <div class="detail-modal__section">
    <h3 class="detail-modal__section-header">Related Dates</h3>
    <ul class="detail-modal__section-body">
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Last Modified</p>
        <p class="detail-modal__item-content">${fileArr[fileIndex].timeLastModified}</p>
      </li>
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Created</p>
        <p class="detail-modal__item-content">${fileArr[fileIndex].timeCreate}</p>
      </li>
    </ul>
  </div>
  <div class="detail-modal__section">
    <h3 class="detail-modal__section-header">Related People</h3>
    <ul class="detail-modal__section-body">
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Author</p>
        <p class="detail-modal__item-content">
          Quynh Nguyen</p>
      </li>
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Last Modified By</p>
        <p class="detail-modal__item-content">
          Quynh Nguyen</p>
      </li>
    </ul>
  </div>
  <div class="detail-modal__section">
    <h3 class="detail-modal__section-header">Related Document</h3>
    <ul class="detail-modal__section-body">
      <li class="detail-modal__item">
        <p class="detail-modal__item-label">Location</p>
        <p class="detail-modal__item-content">
          <i class="fas fa-folder-open"></i>
          Web
        </p>
      </li>
    </ul>
  </div>`;
  detailBody.innerHTML = detailFile;
  detailModal.classList.add("open");
});

closeModal.addEventListener("click", hideDetailModal);
modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

downloadBtn.addEventListener("click", function () {
  let fileArr = getFileList();
  let downloadIndex = this.getAttribute("indexDownload");
  let fileIndex;
  if (downloadIndex == 0 || downloadIndex) {
    fileIndex = downloadIndex;
  } else {
    fileIndex = fileArr.length - 1;
  }
  downloadLink.setAttribute(
    "href",
    "data:text/html," + fileArr[fileIndex].content
  );
  downloadLink.setAttribute("download", fileArr[fileIndex].name + ".html");
});

// menuRecentBtn.addEventListener('click', function() {
//   let menuDetail =
//   `<ul class="file-recent-heading__menu-list">
//     <li class="file-recent-heading__menu-item">
//       <i class="fas fa-copy"></i>
//       <p>Duplicate</p>
//     </li>
//     <li class="file-recent-heading__menu-item">
//       <i class="fas fa-trash"></i>
//       <p>Delete</p>
//     </li>
//     <li class="file-recent-heading__menu-item">
//       <i class="fas fa-pen"></i>
//       <p>Edit</p>
//     </li>
//   </ul>`
//   recentWrap.innerHTML = menuDetail;
//   menuRecent.classList.add('open');
// })
