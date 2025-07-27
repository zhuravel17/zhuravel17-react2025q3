import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './About.styles.css';
import SchoolLogo from '../../assets/school-logo.svg';

export function About(): ReactElement {
  return (
    <div className="about-container">
      <h1>About</h1>
      <p>
        This application was created by{' '}
        <a
          href="https://github.com/zhuravel17/"
          target="_blank"
          rel="noreferrer"
        >
          zhuravel17
        </a>{' '}
        as part of project in RS React course.
      </p>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <img src={SchoolLogo} />
      </a>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}
