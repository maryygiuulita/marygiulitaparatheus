// Sempre inicia no topo ao recarregar a página
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  updateCarousel(); // Inicializa a opacidade dos slides corretamente ao carregar
});

let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let items = document.querySelectorAll('.item');
let slide = document.querySelector('.slide');
let videoStarted = false;
let buttons = document.querySelectorAll('.button button'); // Seleciona os botões

// Função para mover os sliders
function moveSlider(direction) {
  items = document.querySelectorAll('.item');

  if (direction === 'next') {
    slide.appendChild(items[0]);
  } else {
    slide.prepend(items[items.length - 1]);
  }

  // Garante opacidade 0 no item da posição 6
  enforceOpacityAtPosition6();

  // Verifica a posição do vídeo e impede looping
  checkVideoPosition();

  // Verifica o botão "prev"
  checkPrevButton();
}

// Função para reforçar opacidade zero no item 6
function enforceOpacityAtPosition6() {
  items = document.querySelectorAll('.item'); // Atualiza a lista de itens
  items.forEach((item, index) => {
    if (index >= 5) { // Posição 6 ou mais (base 0)
      item.style.opacity = '0';
      item.style.pointerEvents = 'none';
    } else {
      item.style.opacity = '1';
      item.style.pointerEvents = 'auto';
    }
  });
}

// Função para verificar se "prev" deve estar invisível
function checkPrevButton() {
  items = document.querySelectorAll('.item');
  const centralItem = items[1]; // Slider central (posição 2)

  // Verifica se a imagem central é "imagem2.jpeg"
  if (centralItem.style.backgroundImage.includes('imagem2.jpeg')) {
    prev.style.opacity = '0'; // Abaixa a opacidade do botão
    prev.style.pointerEvents = 'none'; // Desativa interatividade
  } else {
    prev.style.opacity = '1'; // Restaura a opacidade
    prev.style.pointerEvents = 'auto'; // Ativa interatividade
  }
}

function updateCarousel() {
  let items = document.querySelectorAll('.item'); // Seleciona todos os itens do carrossel

  // Atualiza a opacidade dos itens
  items.forEach((item, index) => {
      if (index === 0) { // Assume que a primeira posição é index 0
          item.style.opacity = '0'; // Torna o primeiro item invisível
      } else {
          item.style.opacity = '1'; // Restante dos itens visíveis
      }
  });
}

// Certifique-se de chamar updateCarousel sempre que o carrossel for atualizado/movido
updateCarousel();


// Função para verificar a posição do vídeo e impedir looping
function checkVideoPosition() {
  items = document.querySelectorAll('.item');
  const videoItem = Array.from(items).find((item) =>
    item.querySelector('video') // Procura pelo item que contém o vídeo
  );

  if (!videoItem) return; // Se não houver vídeo, não faz nada

  const videoIndex = Array.from(items).indexOf(videoItem);

  // Se o vídeo estiver na posição 2, o item 1 terá opacidade 0
  if (videoIndex === 1) {
    items[0].style.opacity = '0';
    items[0].style.pointerEvents = 'none';

    // Reproduz o vídeo automaticamente
    if (!videoStarted) {
      startVideo(videoItem);
    }
  }
}

function startVideo(videoItem) {
  const videoContent = videoItem.querySelector('video');

  if (videoContent) {
    buttons.forEach((btn) => (btn.style.display = 'none')); // Oculta os botões
    videoContent.play();
    videoStarted = true;

    videoContent.addEventListener('ended', () => {
      showAllSliders(); // Restaura os sliders
      buttons.forEach((btn) => (btn.style.display = 'block')); // Mostra os botões novamente
      updateCarousel(); // Garante que as opacidades estejam corretas

      // Cria o botão para ir à mensagem final
      const goToFinalMessageButton = document.createElement('button');
      goToFinalMessageButton.textContent = 'Ver Mensagem Final';
      goToFinalMessageButton.className = 'final-message-btn'; // Adiciona classe para estilização
      goToFinalMessageButton.style.position = 'absolute'; // Posição absoluta
      goToFinalMessageButton.style.left = '-350px'; // Esquerda fixa
      goToFinalMessageButton.style.bottom = '-100px'; // Abaixo fixo

      goToFinalMessageButton.addEventListener('click', () => {
        document.querySelector('#final-message').scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      });

      document.querySelector('.container').appendChild(goToFinalMessageButton); // Adiciona o botão ao container do carrossel
    });
  }
}


// Função para mostrar todos os sliders novamente
function showAllSliders() {
  items.forEach((item) => {
    item.style.opacity = '1';
    item.style.pointerEvents = 'auto';
  });
}

// Eventos para botões "next" e "prev"
next.addEventListener('click', () => {
  moveSlider('next');
  updateCarousel();
});

prev.addEventListener('click', () => {
  moveSlider('prev');
  updateCarousel();
});

// Inicia a rolagem para a galeria ao clicar no botão
document.getElementById('open-surprise').addEventListener('click', () => {
  const slideSection = document.querySelector('.enquete');
  slideSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  // Verifica o botão "prev" após iniciar
  checkPrevButton();
});

// Chamada inicial para opacidade e vídeo
enforceOpacityAtPosition6();
checkVideoPosition();


document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');

  // Função para tocar o áudio após interação
  const playAudio = () => {
    audio.play().catch((error) => {
      console.log('Autoplay bloqueado. Áudio será iniciado após interação do usuário.', error);
    });
    document.removeEventListener('click', playAudio); // Remove o evento após tocar
  };

  // Escuta a interação inicial
  document.addEventListener('click', playAudio);
});

document.querySelector('#backToCarousel').addEventListener('click', () => {
  document.querySelector('.scroll1').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

document.getElementById('yesButton').addEventListener('click', () => {
  document.querySelector('.scroll1').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

document.getElementById('noButton').addEventListener('click', () => {
  // Opcional: adicionar alguma lógica para quando clicar em "Não"
  console.log("tchola");
});


document.getElementById('noButton').addEventListener('mouseover', function(e) {
  const enqueteBox = document.getElementById('enquete');
  const maxX = enqueteBox.clientWidth - this.clientWidth;
  const maxY = enqueteBox.clientHeight - this.clientHeight;
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  this.style.position = 'absolute';
  this.style.left = randomX + 'px';
  this.style.top = randomY + 'px';
});

document.getElementById('noButton').addEventListener('click', function(e) {
  e.preventDefault(); // Impede qualquer ação padrão do botão
  const message = "Parabéns! nadou nadou e morreu na praia, agora clica no botao certo!";
  alert(message); // Exibe um pop-up com a mensagem
});

document.getElementById('gotoFinalMessage').addEventListener('click', () => {
  document.getElementById('final-message').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
});

