import React from 'react';
import Layout from '../../components/Layout';
import { SectionTitle, Pill } from '../../styles';
import { ProjectItem, ProjectTitle, SkillContainer } from './styles';

const Projects = ({ user }) => {
  return (
    <Layout user={user}>
      <div>
        <SectionTitle>Projects</SectionTitle>
        <ul>
          {user.projects.map((project, i) => (
            <ProjectItem key={i}>
              <ProjectTitle>{project.name}
              <li class="socialWrapper color--teal">
                <a class="social color--teal"
                   title="GitHub"
                   target="_blank"
                   href={project.githubUrl}>
                  <i class="fa fa-github"></i>
                </a>
              </li>
               {project.website ?
                <li class="socialWrapper">
                  <a class="color--teal social"
                    title="Website"
                    target="_blank"
                    href={project.website}>
                    <i class="fa fa-globe"></i>
                    </a>
                </li>
                : <li></li>
              }
            </ProjectTitle>
              <p>{project.summary}</p>
              <SkillContainer>
                {[...project.languages, ...project.libraries].map((item, j) => (
                  <Pill key={j}>{item}</Pill>
                ))}
              </SkillContainer>
            </ProjectItem>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Projects;
