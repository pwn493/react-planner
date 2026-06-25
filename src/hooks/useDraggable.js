import { useState } from 'react';

export function useDraggable(id, onDrop) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragStart(e) {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const fromId = e.dataTransfer.getData('text/plain');
    if (fromId && fromId !== id) {
      onDrop(fromId, id);
    }
    setIsDragOver(false);
  }

  return {
    isDragOver,
    dragProps: {
      draggable: true,
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
}
