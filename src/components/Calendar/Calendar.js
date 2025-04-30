import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  padding: 20px;
  z-index: 9999;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayCell = styled.div`
  text-align: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  min-height: 60px;
  border: 1px solid #eee;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  
  // 生成当月天数
  const daysInMonth = new Date(
    currentDate.getFullYear(), 
    currentDate.getMonth() + 1, 
    0
  ).getDate();
  
  // 生成日历天数数组
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const [editingCell, setEditingCell] = useState(null);
  
  const handleDayDoubleClick = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setEditingCell(dateKey);
  };
  
  const handleTaskChange = (e, day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setTasks({...tasks, [dateKey]: e.target.innerHTML});
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  return (
    <CalendarWrapper>
      <Header>
        <Title>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</Title>
      </Header>
      <DaysGrid>
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <DayCell key={day}>{day}</DayCell>
        ))}
        {daysArray.map(day => {
          const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
          return (
            <DayCell 
              key={day}
              onDoubleClick={() => handleDayDoubleClick(day)}
              style={{
                backgroundColor: editingCell === dateKey ? '#e6f7ff' : 'inherit',
                borderColor: editingCell === dateKey ? '#1890ff' : '#eee'
              }}
            >
              {day}
              {editingCell === dateKey ? (
                <div 
                  contentEditable
                  onBlur={(e) => handleTaskChange(e, day)}
                  onKeyDown={handleKeyDown}
                  dangerouslySetInnerHTML={{ __html: tasks[dateKey] || '' }}
                  autoFocus
                  style={{fontSize: '12px', marginTop: '4px', outline: 'none', whiteSpace: 'pre-wrap', textAlign: 'left', minHeight: '20px'}}
                />
              ) : (
                tasks[dateKey] && (
                  <div 
                    style={{fontSize: '12px', marginTop: '4px', whiteSpace: 'pre-wrap', textAlign: 'left', minHeight: '20px'}}
                    dangerouslySetInnerHTML={{ __html: tasks[dateKey] ? tasks[dateKey].replace(/\n/g, '<br/>') : '' }}
                  />
                )
              )}
            </DayCell>
          );
        })}
      </DaysGrid>
    </CalendarWrapper>
  );
}