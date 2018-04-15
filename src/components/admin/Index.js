import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <h3 className="text-center">Welcome Admin</h3>
    <img alt="" className="img-responsive imageIndexTop" src="/media/cards/adminIndex.png" />
    <CardWithIcon
      title="Confirm teacher accounts"
      text="Confirm pending unconfirmed users for teacher role."
      image="default.png"
      links={[{ path: '/', label: 'Click here to confirm' }]}
    />
    <CardWithIcon
      title="Confirm student accounts"
      text="Confirm pending unconfirmed users for student role."
      image="default.png"
      links={[{ path: '/', label: 'Click here to confirm' }]}
    />
    <CardWithIcon
      title="Manage teacher accounts"
      text="Manage all teacher accounts present in the University"
      image="default.png"
      links={[{ path: '/', label: 'Click here to manage' }]}
    />
    <CardWithIcon
      title="Manage student accounts"
      text="Manage all student accounts present in the University"
      image="default.png"
      links={[{ path: '/', label: 'Click here to manage' }]}
    />
  </div>
);
export default Index;
