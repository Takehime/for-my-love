'use strict';


const SETTINGS = {
  relationshipStart: '2026-03-29',
  herName: 'Ульяна', 
  signature: 'Твой любимый димочка'
};

const comfortMessages = {
  miss: {
    title: 'Если ты очень скучаешь…', icon: '♡',
    texts: [
      'Закрой глаза на пару секунд. Представь, что я рядом, обнимаю тебя обеими руками и не отпускаю пока тебе самой не захочется. Я тоже буду ждать настоящего объятия. А пока пусть это будет маленькое, но очень искреннее виртуальное. Я тебя очень сильно люблю моя любимая девочка♡.❤️💋',
    ]
  },
  sad: {
    title: 'Тебе не нужно быть сильной каждую минуту', icon: '☁',
    texts: [
      'Можно ничего не успеть. Можно передумать. Можно немного полежать и выдохнуть. Твоя ценность не измеряется продуктивностью и хорошим настроением. Ты мне дорога не за то, что всё делаешь идеально. Просто за то, что ты —ты. И это самое важно для меня любимка моя<3❤️💋',
      
    ]
  },
  anxious: {
    title: 'Давай на минутку выдохнем', icon: '✧',
    texts: [
      'Положи ножки поудобнее. Расслабь плечи. Медленно вдохни, а потом спокойно выдохни. Посмотри вокруг и назови про себя три вещи, которые видишь. Тебе не обязательно решать всё прямо сейчас. Только этот момент. Только один маленький следующий шаг. Я мысленно держу тебя за руку всегда и никогда зай не отпушу ее.❤️💋',
    ]
  },
  sleep: {
    title: 'Спокойной ночи, моя девочка', icon: '☾',
    texts: [
      'Сладких снов тебе солнышко я тебя очень очень сильно люблю целую обнимаю крепко крепко я уже очень сильно скучаю по тебе зай я уверен что у нас все будет ахуенно и мы дождёмся друг друга и потом обязательно поженимся в красивую дату люблю тебя моя девочка я тебя ни за что ни не предам, помни это❤️❤️💋💋💋❤️❤️❤️❤️❤️❤️❤️',

    ]
  },
  proud: {
    title: 'Я тобой горжусь', icon: '✿',
    texts: [
      'Я тобой горжусь зай ты у меня самая лучшая девочка на свете у тебя все получится я знаю как бы тебе не было тяжело в учебе или где либо еще я всегда буду верить в тебя и знать что у тебя все выйдет ты у меня сильная и самая прекрасная❤️💋'
    ]
  },
  smile: {
    title: 'Лови немного нежности', icon: '☻',
    texts: [
     'Если бы я мог телепортироваться к тебе то зацеловал бы тебя с ног до головы всю мою самую лучшую и прекрасную девочку дороже и важнее тебя у меня никого нет надеюсь мне чуть чуть удалось поднять тебе настроение солнышко❤️💋' 
    ]
  }
};

const dailyMessages = [
  'Тебе не нужно заслуживать любовь. Ты достойна её просто потому, что ты это ты.',
  'Пожалуйста, не забывай включать себя в список людей, о которых заботишься.',
  'Даже самый обычный день становится важным, если в нём нашлось хоть немного тепла.',
  'Ты можешь скучать по мне и всё равно смеяться, гулять, мечтать и радоваться жизни. Я хочу, чтобы у тебя было много поводов улыбаться.',
  'Один трудный день не отменяет всех хороших дней впереди. Дай себе время.',
  'Если сегодня никто не сказал тебе ничего доброго  пусть это сделает моё маленькое место. Ты замечательная.',
  'Не торопи себя. Цветы тоже не распускаются все в один день.',
  'Пусть сегодня у тебя будет что-то вкусное, что-то уютное и хотя бы одна причина улыбнуться.',
  'Любовь  это ещё и желание, чтобы любимому человеку было хорошо. Поэтому, пожалуйста, береги себя и свою радость.',
  'Ты не обязана быть идеальной, чтобы быть любимой. Можно быть настоящей. Мне важна именно ты.',
  'Пусть это будет твоим напоминанием: ты заслуживаешь мягкости, терпения и добрых слов  в том числе от самой себя.',
  'Где бы мы ни находились, у нас уже есть наша история. И впереди ещё столько моментов, которые станут нашими.'
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const modal = $('#messageModal');
let activeMessageKey = null;
let activeMessageIndex = 0;
let dailyIndex = 0;

function localDateFromISO(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function updateRelationshipCounter() {
  const start = localDateFromISO(SETTINGS.relationshipStart);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.max(0, Math.floor((today - start) / 86400000));
  $('#daysTogether').textContent = new Intl.NumberFormat('ru-RU').format(days);
  const d = days % 10, d2 = days % 100;
  let word = 'дней';
  if (d === 1 && d2 !== 11) word = 'день';
  else if ([2,3,4].includes(d) && ![12,13,14].includes(d2)) word = 'дня';
  $('.count-caption').textContent = `${word} общей истории`;
  $('#togetherSub').textContent = days === 0 ? 'Сегодня начинается наша история.' : 'И каждый из них  часть нас.';
}

function openComfortMessage(key, next = false) {
  const entry = comfortMessages[key];
  if (!entry) return;
  if (!next || activeMessageKey !== key) activeMessageIndex = Math.floor(Math.random() * entry.texts.length);
  else activeMessageIndex = (activeMessageIndex + 1) % entry.texts.length;
  activeMessageKey = key;
  $('#modalFlower').textContent = entry.icon;
  $('#modalTitle').textContent = SETTINGS.herName ? `${entry.title.replace('Моя хорошая', SETTINGS.herName)}` : entry.title;
  $('#modalText').textContent = entry.texts[activeMessageIndex];
  modal.hidden = false;
  document.body.classList.add('modal-open');
  $('[data-close-modal]', modal).focus?.();
}

$$('[data-message]').forEach(button => {
  button.addEventListener('click', () => openComfortMessage(button.dataset.message));
});

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}
$$('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

function updateDailyMessage() {
  const now = new Date();
  const dayOfYear = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(now.getFullYear(), 0, 0)) / 86400000);
  dailyIndex = dayOfYear % dailyMessages.length;
  $('#dailyMessage').textContent = dailyMessages[dailyIndex];
}
$('#newDailyMessage').addEventListener('click', () => {
  dailyIndex = (dailyIndex + 1 + Math.floor(Math.random() * (dailyMessages.length - 1))) % dailyMessages.length;
  $('#dailyMessage').textContent = dailyMessages[dailyIndex];
  $('#newDailyMessage').animate?.([{transform:'rotate(0deg)'},{transform:'rotate(360deg)'}], {duration:350, easing:'ease-out'});
});

let toastTimeout;
function showHugToast() {
  const toast = $('#hugToast');
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2400);
}
function sendHearts(count = 18) {
  const container = $('#heartRain');
  const symbols = ['♥', '♡', '✦', '♥', '♡'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'rain-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * .7}s`;
    heart.style.fontSize = `${12 + Math.random() * 19}px`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 3400);
  }
}
$('#hugButton').addEventListener('click', () => {
  sendHearts(13);
  showHugToast();
});
$('#bigHugButton').addEventListener('click', () => {
  sendHearts(32);
  $('#hugResponse').textContent = 'Обнял крепко-крепко. Не отпускаю ещё пару секунд. ♡';
  showHugToast();
});

$('#nightToggle').addEventListener('click', event => {
  const enabled = document.body.classList.toggle('night-mode');
  event.currentTarget.setAttribute('aria-pressed', String(enabled));
  $('.toggle-label', event.currentTarget).textContent = enabled ? 'обычный' : 'ночник';
  event.currentTarget.title = enabled ? 'Выключить ночной режим' : 'Включить ночной режим';
  $('body').dataset.night = enabled ? 'on' : 'off';
});


if (SETTINGS.herName.trim()) {
  document.title = `Для ${SETTINGS.herName} — с любовью ♡`;
  const label = $('.signature-note span:last-child');
  if (label) label.textContent = `для ${SETTINGS.herName}, моей самой любимой девочки`;
  const greeting = $('.letter-greeting');
  if (greeting) greeting.textContent = `${SETTINGS.herName}, моя любимая,`;
}
const signatureNode = $('.letter-sign');
if (signatureNode) {
  signatureNode.replaceChildren(document.createTextNode(SETTINGS.signature + ' '));
  const signatureHeart = document.createElement('span');
  signatureHeart.textContent = '♥';
  signatureNode.appendChild(signatureHeart);
}
updateRelationshipCounter();
updateDailyMessage();
