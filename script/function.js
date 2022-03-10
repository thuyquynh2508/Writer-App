function showRecentPage() {
  filePage.classList.add("remove");
  recentPage.classList.add("open");
  for (const menuRecentBtn of menuRecentBtns) {
    menuRecentBtn.addEventListener('click', )
  }
}

function showFilePage() {
  recentPage.classList.remove("open");
  filePage.classList.remove("remove");
  removeHash();
}


function removeHash () { 
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

function getFileList() {
  let getFileLocalStorage = localStorage.getItem("New file");
  if (getFileLocalStorage == null) {
    fileArr = [];
  } else {
    fileArr = JSON.parse(getFileLocalStorage);
  }
  return fileArr;
}


function createNewFile() {
  let fileArr = getFileList();
  saveBtn.setAttribute("indexSave", fileArr.length);
  renameBtn.setAttribute("indexRename", fileArr.length);
  deleteBtn.setAttribute("indexDelete", fileArr.length);
  detailBtn.setAttribute("indexDetail", fileArr.length);
  downloadBtn.setAttribute("indexDownload", fileArr.length);
  let fileName = "Untitled document";
  let fileText = "";
  let fileExist = true;
  let fileTimeCreate = TimeStr();
  let fileTimeLastModified = TimeStr();
  fileArr.push({
    name: fileName,
    content: fileText,
    isExist: fileExist,
    timeCreate: fileTimeCreate,
    timeLastModified: fileTimeLastModified,
  });
  localStorage.setItem("New file", JSON.stringify(fileArr));
}
function showNewFile() {
  createNewFile();
  inputName.value = "Untitled document";
  CKEDITOR.instances.text.setData("");
}

function TimeStr() {
  let now = new Date();
  return now.toLocaleString('en-US');
}

function showRecentList() {
  let fileArr = getFileList();
  let newFileItem = "";
  fileArr.forEach((element, index) => {
    newFileItem += `<li class="file-recent__info" onclick="openFile(${index})">
    <div class="file-recent__info-wrap">
      <div class="file-recent-heading">
        <div class="file-recent-heading__location"> 
          <i class="fas fa-map-marker-alt"></i>
          <p class="file-recent-heading__forder">Web<p>
        </div>
        <div class="file-recent-heading__menu"> 
          <button class="file-recent-heading__menu-btn file-recent-heading__menu-star"><i class="fas fa-star"></i></button>
          <button class="file-recent-heading__menu-btn file-recent-heading__menu-detail"><i class="fas fa-ellipsis-h"></i></button>
        </div>
      </div>
      <div class="file-recent-wrap">
        <div class="file-recent-name">
          <h3 class="file-recent-name__name">${fileArr[index].name}</h3>
          <p class="file-recent-name__content">No comment</p>
        </div>
      </div>
      <div class="file-recent-date">
        <i class="fas fa-calendar-alt"></i>
        Last update ${fileArr[index].timeLastModified}
      </div>
    </div>
    </li>`;
  });
  fileList.innerHTML = newFileItem;
}

function openFile(index) {
  let fileArr = getFileList();
  saveBtn.setAttribute("indexSave", index);
  renameBtn.setAttribute("indexRename", index);
  deleteBtn.setAttribute("indexDelete", index);
  detailBtn.setAttribute("indexDetail", index);
  downloadBtn.setAttribute("indexDownload", index);
  inputName.value = fileArr[index].name;
  CKEDITOR.instances["text"].setData(fileArr[index].content);
  fileArr[index].timeLastModified = TimeStr();
  showFilePage();
}


function hideDetailModal() {
  detailModal.classList.remove("open");
}
