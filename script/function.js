$(document).ready(function () {
  $("#summernote").summernote({
    placeholder: "Type your text here...",
    height: 1000,
  });
});

const filePage = document.querySelector('.file-page');
const recentPage = document.querySelector('.recent-page');

const openBtn = document.querySelector('.file-option__open');
const returnBtn = document.querySelector('.recent-nav__return');
const saveBtn = document.querySelector('.file-option__save');

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

