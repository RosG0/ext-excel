import {$} from '@core/dom';

export function resizeHandler(event, root) {
  let target = event.target;
  const resizeName = target.dataset.resize;
  target = $(target);
  const parent = target.closest('[data-type="resizable"]');
  const coords = parent.getCoords();
  const curColNum = parent.getData('col');
  let newValue;

  target.css('opacity', 1);

  document.onmousemove = (e) => {
    if (resizeName === 'col') {
      const dif = e.pageX - coords.right;
      newValue = (coords.width + dif) + 'px';

      target.css({
        'right': -dif + 'px',
        'bottom': '-100vh'
      });
    } else {
      const dif = e.pageY - coords.bottom;
      newValue = (coords.height + dif) + 'px';
      target.css({
        'bottom': -dif + 'px',
        'right': '-100vw'
      });
    }
  };

  document.onmouseup = () => {
    if (resizeName === 'col') {
      parent.css({width: newValue});
      root.findAll(`[data-col="${curColNum}"]`).forEach((element) => {
        element.style.width = newValue;
      });
    } else {
      parent.css({height: newValue});
    }

    target.css({
      'opacity': 0,
      'bottom': 0,
      'right': 0
    });

    document.onmouseup = null;
    document.onmousemove = null;
  };
}
