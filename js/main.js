"use strict";

const worksWrap = document.querySelector(".works__wrap");

const getData = async function (url) {
  const responce = await fetch(url);

  if (!responce.ok) {
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибки ${responce.status}`
    );
  } else {
    return await responce.json();
  }
};
function createTechstackItem(techstackList, techstackItem) {
  techstackList.insertAdjacentHTML(
    "beforeend",
    `
    <li class="techstack__item">${techstackItem}</li>
      `
  );
  console.log(techstackList, techstackItem);
}

function createCardWorks(work) {
  const { title, description, type, techStack, code, pages } = work;

  const card = document.createElement("div");

  card.className = "works__card card";
  card.insertAdjacentHTML(
    "beforeend",
    `    
      <div class="card__front">      
      <img src="img/works/${title}.PNG" class="b-lazy" alt="">
      <div class="works__wrap_img"></div>
    </div>
    <div class="card__back">
      <p>${description}</p>
    <div class="techstack">
      <ul class="techstack__list">
      </ul>
    </div>
    <ul class="works__btnList">
    </ul>
      </div>           		
					`
  );

  worksWrap.insertAdjacentElement("beforeend", card);

  const worksBtnList = card.querySelector(".works__btnList");

  if (code) {
    worksBtnList.insertAdjacentHTML(
      "beforeend",
      `         
        <li><a class="work-btn btn-github" href="${code}" target="blank"><i class="fa fa-github" aria-hidden="true">
        `
    );
  }

  if (pages) {
    worksBtnList.insertAdjacentHTML(
      "beforeend",
      `    
        <li><a class="work-btn work-btn1" href="${pages}" target="blank"><i class="fa fa-link" aria-hidden="true">
                `
    );
  }

  const techstackList = card.querySelector(".techstack__list");

  if (techStack) {
    techStack.forEach((item) => createTechstackItem(techstackList, item));
  }

  console.log(worksBtnList);
}

function init() {
  getData("./db/MyProjectTEST.json").then(function (data) {
    console.log(data);
    data.forEach(createCardWorks);
  });
}

init();
