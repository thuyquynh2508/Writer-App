const filePage = document.querySelector('.file-page');
const recentPage = document.querySelector('.recent-page');

const fileContent = document.getElementById('text');

const openBtn = document.querySelector('.file-option__open');
const returnBtn = document.querySelector('.recent-nav__return');
const saveBtn = document.querySelector('.file-option__save');
const newBtn = document.querySelector('.file-option__new');

const fileList = document.querySelector('.file-recent');
const inputName = document.querySelector('.file-info__name-text');
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

saveBtn.addEventListener('click', function(e) {
  // e.preventDefault();
  // let getFileLocalStorage = localStorage.getItem("New file");
  // if (getFileLocalStorage == null) {
  //   fileArr = [];
  // } else {
  //   fileArr = JSON.parse(getFileLocalStorage);
  // }

  // let fileName = '';
  // let fileText = CKEDITOR.instances.text.getData();
  // let fileExist = true;
  // let fileTimeCreate = '';
  // let fileTimeLastModified = '';
  // fileArr.push ({
  //   name: fileName,
  //   content: fileText,
  //   isExist: fileExist,
  //   timeCreate: fileTimeCreate,
  //   timeLastModified: fileTimeLastModified
  // });
  // localStorage.setItem("New file", JSON.stringify(fileArr));
})

newBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let getFileLocalStorage = localStorage.getItem("New file");
  if (getFileLocalStorage == null) {
    fileArr = [];
  } else {
    fileArr = JSON.parse(getFileLocalStorage);
  }
  let fileName = 'Untitled document';
  let fileText = CKEDITOR.instances.text.getData();
  let fileExist = true;
  let fileTimeCreate = TimeStr();
  let fileTimeLastModified = '';
  fileArr.push ({
    name: fileName,
    content: fileText,
    isExist: fileExist,
    timeCreate: fileTimeCreate,
    timeLastModified: fileTimeLastModified
  });
  localStorage.setItem("New file", JSON.stringify(fileArr));
  showRecentList();
})
function showNewFile() {

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
  let getFileLocalStorage = localStorage.getItem("New file");
  if (getFileLocalStorage == null) {
    fileArr = [];
  } else {
    fileArr = JSON.parse(getFileLocalStorage);
  }
  let newFileItem = "";
  fileArr.forEach((element, index) => {
    newFileItem += `<li class="file-recent__info">
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

function saveFile(index) {
  let getFileLocalStorage = localStorage.getItem("New file");
  fileArr = JSON.parse(getFileLocalStorage);

}