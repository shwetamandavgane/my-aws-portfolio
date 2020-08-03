import React from 'react';
import Layout from '../../components/Layout';
import { SectionTitle, Paragraph, Pill } from '../../styles';
import { ProfileLink } from './styles';

const Me = ({ user }) => {
  return (
    <Layout user={user}>
      <div>
        <SectionTitle>About Me</SectionTitle>
        <Paragraph>{user.basics.summary}</Paragraph>
      </div>
      <div>
        <SectionTitle>Skills</SectionTitle>
        <div>
          {user.skills.map(skill => (
            <Pill key={skill.name}>{skill.name}</Pill>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>Profiles</SectionTitle>
         <ul class="section--social">
         <li class="socialWrapper">
           <a class="color--teal social"
              title="LinkedIn Profile"
              target="_blank"
              href="https://www.linkedin.com/in/shweta-mandavgane/">
             <i class="fa fa-linkedin"></i>
           </a>
         </li>
         <li class="socialWrapper color--teal">
           <a class="social color--teal"
              title="GitHub Profile"
              target="_blank"
              href="https://github.com/shwetamandavgane">
             <i class="fa fa-github"></i>
           </a>
         </li>
       </ul>
      </div>
    </Layout>
  );
};

export default Me;
