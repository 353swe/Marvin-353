import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <h3 className="text-center">Welcome Teacher</h3>
    <CardWithIcon
      title="Exams list"
      text="Show all my exams list"
      image="default.png"
      links={[{ path: '/', label: 'Click here to see your exams' }]}
    />
    <CardWithIcon
      title="Optional exams"
      text="Show all optional exams for my course"
      image="default.png"
      links={[{ path: '/', label: 'Click here to see optional exams' }]}
    />
    <CardWithIcon
      title="Summary"
      text="Show me summary about my all credits and credits to end"
      image="default.png"
      links={[{ path: '/', label: 'Click here for summary' }]}
    />
  </div>
);

export default Index;
