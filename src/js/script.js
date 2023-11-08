const img = document.querySelectorAll('.carousel__inner img');
const firsTab = document.querySelectorAll('.catalog__tab')
let curentIndex = 0;

function showImg(index) {
  console.log(img)
  img[curentIndex].classList.remove('active');
  img[index].classList.add('active');
  curentIndex = index;
}

const showList = (link) => {
  console.log(link)
  const component = link.closest('.catalog-item')
  const content = component.querySelector('.catalog-item__content')
  const list = component.querySelector('.catalog-item__list')
  console.log(content)
  if (link.classList.contains('catalog-item__link')) {
    console.log('work1')
    content.classList.remove('catalog-item__content_active')
    list.classList.add('catalog-item__list_active')
  } else {
    console.log('work2')
    list.classList.remove('catalog-item__list_active')
    content.classList.add('catalog-item__content_active')
  }
}

const showTab = (elTabBtn) => {
  const elTab = elTabBtn.closest('.catalog');
  if (elTabBtn.classList.contains('catalog__tab-active')) {
    return;
  }
  const targetId = elTabBtn.dataset.targetId;
  const elTabPane = elTab.querySelector(`.catalog__content[data-id="${targetId}"]`);
  if (elTabPane) {
    if (elTab.querySelector('.catalog__tab-active')) {
      const elTabBtnActive = elTab.querySelector('.catalog__tab-active');
    elTabBtnActive.classList.remove('catalog__tab-active');
    }
    const elTabPaneShow = elTab.querySelector('.catalog__content-active');
    if (elTab.querySelector('.catalog-item__list_active')) {
      elTab.querySelector('.catalog-item__list_active').classList.remove('catalog-item__list_active')
    }
    elTabPaneShow.classList.remove('catalog__content-active');
    const previousItemContents = elTabPaneShow.querySelectorAll('.catalog-item__content');
    previousItemContents.forEach((content) => {
      content.classList.remove('catalog-item__content_active');
    });
    elTabPaneShow
    elTabBtn.classList.add('catalog__tab-active');
    elTabPane.classList.add('catalog__content-active');

    const catalogItemContents = elTabPane.querySelectorAll('.catalog-item__content');
    catalogItemContents.forEach((content) => {
      content.classList.add('catalog-item__content_active');
    });
  }
}

const showModal = (type) => {
  if (type.dataset.product) {
    const modal = document.querySelector(`#order`)
    const subtitle = modal.querySelector('.modal__descr')
    subtitle.append(type.dataset.product)
    document.querySelector('.overlay').classList.add('overlay_active')
    modal.classList.add('modal_active')
    return
  } else {
    document.querySelector('.overlay').classList.add('overlay_active')
    document.querySelector(`#${type.dataset.modal}`).classList.add('modal_active')
  }
  
}

const closeModal = (button) => {
  console.log(button.closest('.modal'))
  if (button.closest('.modal').id == 'order') {
    const modal = button.closest('.modal')
    const subtitle = modal.querySelector('.modal__descr')
    subtitle.textContent = '';
    modal.classList.remove('modal_active')
    button.closest('.overlay').classList.remove('overlay_active')
  }
  button.closest('.modal').classList.remove('modal_active')
  button.closest('.overlay').classList.remove('overlay_active')
}

document.querySelector('.catalog').addEventListener('click', (e) => {
  console.log(e.target)
  e.preventDefault()
  if (e.target.classList.contains('catalog-item__link')) {
    console.log('work!')
    showList(e.target)
  } else if (e.target.classList.contains('catalog-item__back')) {
    showList(e.target)
  }
  if (e.target && !e.target.closest('.catalog__tab')) {
    return;
  }
  const elTabBtn = e.target.closest('.catalog__tab');
  showTab(elTabBtn);
});

document.querySelector('.carousel__inner').addEventListener('click', function (e) {
  if (e.target.classList.contains('prev')) {
    let index = curentIndex - 1;
    if (index < 0) {
      index = img.length - 1;
    }
    showImg(index);
  } else if (e.target.classList.contains('next')) {
    let index = curentIndex + 1;
      if (index >= img.length) {
        index = 0;
      }
      showImg(index);
  }
});

document.querySelectorAll('.button').forEach((btn) => {
btn.addEventListener('click', function (e) {
  console.log(e.target.dataset)
  if (e.target.classList.contains('button_mini')) {
    showModal(e.target)
  }
  if (e.target.dataset.modal) {
    showModal(e.target)
  }
})
})

document.querySelectorAll('.modal__close').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    closeModal(e.target)
  })
  })

// Modal 



showImg(curentIndex);
showTab(firsTab[0])