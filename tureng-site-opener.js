const mousePosition = { x: 0, y: 0 };

const TURENG_SITE_OPENER_CLASSNAME = 'tureng-site-opener-xxx';
const TurengSiteOpener = document.createElement('a');
TurengSiteOpener.classList.add(TURENG_SITE_OPENER_CLASSNAME);

loadCss(`
.${TURENG_SITE_OPENER_CLASSNAME}{
  background-color: #ddd;
  border: 1px solid #ddd;
  position: absolute;
}
`);

TurengSiteOpener.innerHTML = 'Tureng';
TurengSiteOpener.target = '_blank';

function getSelectionText() {
  var text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}

function buildElement(searchText) {
  const { x, y } = mousePosition;
  const aligmentLeft = 60;
  const aligmentTop = 15;
  TurengSiteOpener.style.top = (y < aligmentTop ? y : y - aligmentTop) + 'px';
  TurengSiteOpener.style.left =
    (x < aligmentLeft ? x + 350 : x - aligmentLeft) + 'px';
  TurengSiteOpener.href = `https://tureng.com/tr/turkce-ingilizce/${searchText}`;

  return TurengSiteOpener;
}

function onTextSelected(selectedText) {
  const hasMultipleWord = selectedText.split(' ').length > 1;
  if (hasMultipleWord) {
    return;
  }

  document.body.appendChild(buildElement(selectedText));
}

function main() {
  window.addEventListener('mouseup', (event) => {
    if (event.target === TurengSiteOpener) {
      return;
    }

    const selection = getSelectionText().trim();
    if (selection) {
      onTextSelected(selection);
    } else {
      if (document.body.contains(TurengSiteOpener) && event.which === 1) {
        TurengSiteOpener.remove();
      }
    }
  });

  window.addEventListener('mousemove', (event) => {
    const e = event || window.event;

    Object.assign(mousePosition, {
      x: e.clientX + window.pageXOffset,
      y: e.clientY + window.pageYOffset,
    });
  });
}

main();
