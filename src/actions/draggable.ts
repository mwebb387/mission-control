export function draggable(node: HTMLElement, data: object) {
  function onDragStart(event: DragEvent) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('application/json', JSON.stringify(data));
  }

  node.setAttribute('draggable', 'true');
  node.addEventListener('dragstart', onDragStart);
}
