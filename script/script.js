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

const menuBar = document.querySelector(".mobile-menu");
const menuMobile = document.querySelector(".file-bar");

const popupDelete = document.querySelector(".popup-container");
const popupYes = document.querySelector(".popup-btn__yes");
const popupNo = document.querySelector(".popup-btn__no");

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
  let fileIndex=getIndex(openIndex);
  fileArr[fileIndex].name = inputName.value;
  fileArr[fileIndex].content = CKEDITOR.instances.text.getData();
  fileArr[fileIndex].timeLastModified = TimeStr();
  localStorage.setItem("New file", JSON.stringify(fileArr));
  showRecentList();
});

renameBtn.addEventListener("click", function () {
  let fileArr = getFileList();
  let renameIndex = this.getAttribute("indexRename");
  let fileIndex = getIndex(renameIndex);
  document.getElementById("name-input").focus();
  document.getElementById("name-input").select();
  inputName.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      fileArr[fileIndex].name = inputName.value;
      localStorage.setItem("New file", JSON.stringify(fileArr));
      document.getElementById("name-input").blur();
      showRecentList();
    }
  });
});

document.getElementById("name-input").addEventListener("focus", function () {});
deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let deleteIndex = this.getAttribute("indexDelete");
  popupDelete.classList.add('open');
  popupYes.addEventListener('click', function(){
    let fileArr = getFileList(); 
    fileArr.splice(deleteIndex, 1);
    localStorage.setItem("New file", JSON.stringify(fileArr));
    popupDelete.classList.remove('open');
    showRecentList();
    showRecentPage();
  })
  this.removeAttribute("indexDelete");
  popupNo.addEventListener('click', function() {
    popupDelete.classList.remove('open');
  })  
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
  let fileIndex = getIndex(downloadIndex);
  downloadLink.setAttribute(
    "href",
    "data:text/html," + fileArr[fileIndex].content
  );
  downloadLink.setAttribute("download", fileArr[fileIndex].name + ".html");
});

menuBar.addEventListener('click', showMenuMobile);
