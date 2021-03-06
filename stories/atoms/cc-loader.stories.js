import '../../src/atoms/cc-loader.js';
import { makeStory } from '../lib/make-story.js';
import { enhanceStoriesNames } from '../lib/story-names.js';

export default {
  title: '🧬 Atoms/<cc-loader>',
  component: 'cc-loader',
};

const conf = {
  component: 'cc-loader',
  css: `cc-loader {
    background: #eee;
    display: inline-flex;
    margin-right: 1rem;
  }`,
};

export const defaultStory = makeStory(conf, {
  items: [
    { style: 'width: 5rem; height: 5rem' },
    { style: 'width: 5rem; height: 5rem; --cc-loader-color: red' },
    { style: 'width: 5rem; height: 5rem; --cc-loader-color: green' },
  ],
});

export const smallContainer = makeStory(conf, {
  items: [{ style: 'width: 1rem; height: 1rem' }],
});

export const bigContainerWithHorizontallyCentered = makeStory(conf, {
  items: [{ style: 'width: 12rem; height: 6rem' }],
});

export const bigContainerWithVerticallyCentered = makeStory(conf, {
  items: [{ style: 'width: 6rem; height: 10rem;' }],
});

export const customColor = makeStory(conf, {
  items: [
    { style: 'width: 12rem; height: 6rem; --cc-loader-color: red' },
    { style: 'width: 12rem; height: 6rem; --cc-loader-color: green' },
    { style: 'width: 12rem; height: 6rem; --cc-loader-color: orange' },
  ],
});

enhanceStoriesNames({
  defaultStory,
  smallContainer,
  bigContainerWithHorizontallyCentered,
  bigContainerWithVerticallyCentered,
  customColor,
});
