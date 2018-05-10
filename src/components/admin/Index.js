import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <div>
      <Jumbotron>
        <h1>Welcome Administrator</h1>
        <p className="jumbotron-text">
Here you can confirm or deny new users(teachers and students)
and manage all the system users and courses.
To know how much each operation costs please visit the price page.
        </p>
        <p>
          <Button bsStyle="primary" href="price">Price page</Button>
        </p>
      </Jumbotron>
    </div>
    <CardWithIcon
      title="Confirm student accounts"
      text="Confirm pending unconfirmed users for student role."
      image="confirm.png"
      links={[{ path: '/confirmStudents', label: 'Click here to confirm' }]}
    />
    <CardWithIcon
      title="Confirm teacher accounts"
      text="Confirm pending unconfirmed users for teacher role."
      image="confirm.png"
      links={[{ path: '/confirmTeachers', label: 'Click here to confirm' }]}
    />
    <CardWithIcon
      title="Manage Users"
      text="Manage all teacher accounts present in the University"
      image="manageAdmin.png"
      links={[{ path: '/systemUsers', label: 'Click here to manage' }]}
    />
    <CardWithIcon
      title="Manage courses"
      text="Manage all course present in the University"
      image="manageAdmin.png"
      links={[{ path: '/courses', label: 'Click here to manage' }]}
    />
    <CardWithIcon
      title="Exams"
      text="View all exams present in the University"
      image="manageAdmin.png"
      links={[{ path: '/exams', label: 'Click here to view' }]}
    />
  </div>
);
export default Index;
