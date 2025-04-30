import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const NoteContainer = styled.div`
  position: absolute;
  width: 200px;
  min-height: 100px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 12px;
  cursor: move;
  z-index: 10000;
`;

const NoteContent = styled.div`
  min-height: 50px;
  outline: none;
`;

export default function Note({ initialPosition = { x: 100, y: 100 } }) {
  const [position, setPosition] = useState(initialPosition);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('双击编辑笔记');
  const noteRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    setContent(e.target.innerHTML);
    setIsEditing(false);
  };

  return (
    <NoteContainer
      ref={noteRef}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <NoteContent
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <NoteContent dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </NoteContainer>
  );
}