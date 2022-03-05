const filePage = document.querySelector('.file-page');
const recentPage = document.querySelector('.recent-page');

const fileContent = document.getElementById('text');
const fileList = document.querySelector('.file-recent');
const inputName = document.querySelector('.file-info__name-text');

const openBtn = document.querySelector('.file-option__open');
const returnBtn = document.querySelector('.recent-nav__return');
const saveBtn = document.querySelector('.file-option__save');
const newBtn = document.querySelector('.file-option__new');
const renameBtn = document.querySelector('.file-option__rename');
const deleteBtn = document.querySelector('.file-option__delete');

showNewFile();
showRecentList();
function showRecentPage() {
  filePage.classList.add('remove');
  recentPage.classList.add('open');
}

function showFilePage() {
  recentPage.classList.remove('open');
  filePage.classList.remove('remove');
}
openBtn.addEventListener('click', showRecentPage);
returnBtn.addEventListener('click', showFilePage);

newBtn.addEventListener('click', function(e) {
  e.preventDefault();
  showNewFile();
  showRecentList();
})
function getFileList() {
  let getFileLocalStorage = localStorage.getItem("New file");
  if (getFileLocalStorage == null) {
    fileArr = [];
  } else {
    fileArr = JSON.parse(getFileLocalStorage);
  }
  return fileArr;
}
saveBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let fileArr = getFileList();
  let openIndex = this.getAttribute("indexOpen");
  let fileIndex;
  if (openIndex == 0 || openIndex) {
    fileIndex = openIndex;
  } else {
    fileIndex = fileArr.length - 1;
  }
  fileArr[fileIndex].name = inputName.value;
  fileArr[fileIndex].content = CKEDITOR.instances.text.getData();
  fileArr[fileIndex].timeLastModified = TimeStr();
  this.removeAttribute("indexOpen");
  localStorage.setItem("New file", JSON.stringify(fileArr)); 
})

renameBtn.addEventListener('click', function() {
  let fileArr = getFileList();
  let renameIndex = this.getAttribute("indexRename");
  let fileIndex;
  if (renameIndex == 0 || renameIndex) {
    fileIndex = renameIndex;
  } else {
    fileIndex = fileArr.length - 1;
  }
  document.getElementById('name-input').focus();
  document.getElementById('name-input').select();
  inputName.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      fileArr[fileIndex].name = inputName.value;
      localStorage.setItem("New file", JSON.stringify(fileArr)); 
      showRecentList();
    }
  })
  this.removeAttribute("indexRename");
});

document.getElementById('name-input').addEventListener('focus', function() {

})
function createNewFile() {
  let fileArr = getFileList();
  let fileName = 'Untitled document';
  let fileText = '';
  let fileExist = true;
  let fileTimeCreate = TimeStr();
  let fileTimeLastModified = TimeStr();
  fileArr.push ({
    name: fileName,
    content: fileText,
    isExist: fileExist,
    timeCreate: fileTimeCreate,
    timeLastModified: fileTimeLastModified
  });
  localStorage.setItem("New file", JSON.stringify(fileArr));
}
function showNewFile() {
  createNewFile();
  inputName.value = 'Untitled document';
  CKEDITOR.instances.text.setData("");
}

// Xây dựng đối tượng Time
function TimeFormat(day,month,year,hour,minute) {
  this.day = day;
  this.month = month;
  this.year = year;
  this.hour = hour;
  this.minute = minute;
  this.getTime = function() {
    return `${this.day}/${this.month}/${this.year} ${hour}:${minute}` 
  }
}

function TimeStr() {
  let now = new Date();
  let nowObj = new TimeFormat(now.getDate(),now.getMonth()+1, now.getFullYear(), now.getHours(), now.getMinutes());
  return nowObj.getTime();
}

function showRecentList() {
  let fileArr = getFileList();
  let newFileItem = "";
  fileArr.forEach((element, index) => {
    newFileItem += `<li class="file-recent__info" onclick="openFile(${index})">
    <div class="file-recent-wrap">
      <div class="file-recent-icon">
        <i class="far fa-file-alt"></i>
      </div>
      <div class="file-recent-name">
        <h3 class="file-recent-name__name">${fileArr[index].name}</h3>
        <p class="file-recent-name__location">Web</p>
      </div>
    </div>
    <div class="file-recent-date">
      ${fileArr[index].timeCreate}
    </div>
  </li>`
  });
  fileList.innerHTML = newFileItem;
}

function openFile(index) {
  let fileArr = getFileList();
  saveBtn.setAttribute("indexOpen", index);
  renameBtn.setAttribute("indexRename", index);
  deleteBtn.setAttribute("indexDelete", index);
  inputName.value = fileArr[index].name;
  CKEDITOR.instances['text'].setData(fileArr[index].content);
  fileArr[index].timeLastModified = TimeStr();
  showFilePage();
}


deleteBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let fileArr = getFileList();
  let deleteIndex = this.getAttribute("indexDelete");
  fileArr.splice(deleteIndex, 1);
  localStorage.setItem("New file", JSON.stringify(fileArr));
  showRecentList();
  showRecentPage();
})