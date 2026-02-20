// Бургер меню
const burger = document.querySelector('.navbar__burger');
const navLinks = document.querySelector('.navbar__links');

if (burger && navLinks) {
  burger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav__link a').forEach(link => {
      link.addEventListener('click', function() {
          burger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
      });
  });

  window.addEventListener('resize', function() {
      if (window.innerWidth > 640) {
          burger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
      }
  });
}

// Обновление года в футере
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
// searching
let currentMatch = 0;
let matches = [];

document.getElementById('searching').onclick = performSearch;

function performSearch() {
  const text = document.getElementById('searching').value.trim();
  if (!text) return;
  
  // Сбрасываем предыдущий поиск
  clearHighlights();
  
  // Ищем совпадения во всём тексте страницы
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // Игнорируем скрытые элементы и поля ввода
        if (node.parentElement.tagName === 'SCRIPT' || 
            node.parentElement.tagName === 'STYLE' ||
            node.parentElement.tagName === 'INPUT' ||
            node.parentElement.tagName === 'TEXTAREA') {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  const ranges = [];
  const regex = new RegExp(escapeRegex(text), 'gi');
  let node;
  
  while (node = walker.nextNode()) {
    const matches = [...node.textContent.matchAll(regex)];
    matches.forEach(match => {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      ranges.push(range);
    });
  }
  
  // Подсвечиваем результаты
  matches = ranges.map(range => {
    const span = document.createElement('span');
    span.className = 'search-highlight';
    
    range.surroundContents(span);
    return span;
  });
  
  // Навигация по результатам
  if (matches.length > 0) {
    currentMatch = 0;
    scrollToMatch(currentMatch);
    showCounter();
  } else {
    alert('Ничего не найдено');
  }
}

function scrollToMatch(index) {
  matches[index].scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });
  
  // Подсветка текущего
  
}

function showCounter() {
  console.log(`Найдено: ${matches.length}`);
  // Можно вывести в интерфейс
}

function clearHighlights() {
  document.querySelectorAll('.search-highlight').forEach(el => {
    el.outerHTML = el.innerHTML;
  });
  matches = [];
  currentMatch = 0;
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Enter для поиска
document.getElementById('searching').addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
  if (e.key === 'Escape') clearHighlights();
});
