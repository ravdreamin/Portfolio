import React from 'react';
import { Hero } from '../components/home/Hero';
import { Skills } from '../components/home/Skills';
import { Projects } from '../components/home/Projects';
import { Achievements } from '../components/home/Achievements';
import { Contact } from '../components/home/Contact';

export const Home = () => (
  <>
    <Hero />
    <Projects />
    <Skills />
    <Achievements />
    <Contact />
  </>
);
