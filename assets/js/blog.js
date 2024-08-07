document.querySelectorAll('#table-of-contents a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});


function copyCommand(icon) {
  var paragraph = icon.parentNode;
  var textNode = paragraph.firstChild;

  var range = document.createRange();
  range.selectNode(textNode);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    var successful = document.execCommand('copy');
    var message = successful ? 'Command copied to clipboard' : 'Unable to copy command';
    console.log(message);

    var tickIcon = document.createElement('span');
    tickIcon.classList.add('icon', 'material-icons', 'tick-icon');
    tickIcon.textContent = 'done';

    icon.style.display = 'none';
    icon.parentNode.insertBefore(tickIcon, icon);
    tickIcon.style.display = 'inline-block';

    setTimeout(function() {
      tickIcon.style.display = 'none';
      icon.style.display = 'inline-block';
    }, 2000);
  } catch(err) {
    console.error('Error copying command', err);
  }

  window.getSelection().removeAllRanges();
}

