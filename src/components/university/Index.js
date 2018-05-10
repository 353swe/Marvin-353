import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <div>
      <Jumbotron>
        <h1>Welcome University Founder</h1>
        <p className="jumbotron-text">
You are the founder of Marvin!
You can add new administrators and academic years in the system.
To know how much each operation costs please visit the price page.
        </p>
        <p>
          <Button bsStyle="primary" href="price">Price page</Button>
        </p>
      </Jumbotron>

    </div>
    <div className="cards-container">
      <CardWithIcon
        title="Admin"
        text="Manage all the admin of Marvin, add, modify or delete them"
        image="manageAdmin.png"
        links={[{ path: 'admin', label: 'Click here to manage admin' }]}
      />
      <CardWithIcon
        title="Academic Year"
        text="Manage all the academic years of Marvin, add or delete them"
        image="manageAcademicYear.png"
        links={[{ path: 'academicyears', label: 'Click here to manage years' }]}
      />
    </div>
  </div>
);
export default Index;
