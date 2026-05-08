// @ts-nocheck

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * @param {string} id
 * @param {string} method
 */
const toSidebarLabel = (id) =>
  id
    .split('/')
    .pop()
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

/**
 * @param {string} id
 * @param {string} method
 */
const apiDoc = (id, method) => ({
  type: 'doc',
  id,
  label: toSidebarLabel(id),
  className: `sidebar-method sidebar-method--${method.toLowerCase()}`,
});

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'quickstart',
    {
      type: 'category',
      label: 'Projects',
      items: [
        apiDoc('v2/list-projects', 'GET'),
        apiDoc('v2/get-project-details', 'GET'),
        apiDoc('v2/create-project', 'POST'),
        apiDoc('v2/update-project', 'PATCH'),
        apiDoc('v2/delete-project', 'DEL'),
      ],
    },
    {
      type: 'category',
      label: 'Experiments',
      items: [
        apiDoc('v2/create-experiment', 'POST'),
        apiDoc('v2/list-experiments', 'GET'),
        apiDoc('v2/get-experiment-details', 'GET'),
        apiDoc('v2/get-experiment-result', 'GET'),
        apiDoc('v2/get-experiment-share-link', 'GET'),
        apiDoc('v2/get-experiment-preview-urls', 'GET'),
        apiDoc('v2/update-experiment', 'PATCH'),
        apiDoc('v2/update-experiment-status', 'PATCH'),
      ],
    },
    {
      type: 'category',
      label: 'Events',
      items: [
        apiDoc('v2/list-events', 'GET'),
        apiDoc('v2/create-event', 'POST'),
        apiDoc('v2/get-event-details', 'GET'),
        apiDoc('v2/update-event', 'PATCH'),
        apiDoc('v2/delete-event', 'DEL'),
      ],
    },
    {
      type: 'category',
      label: 'Goals',
      items: [
        apiDoc('v2/list-goals', 'GET'),
        apiDoc('v2/create-goal', 'POST'),
        apiDoc('v2/get-goal-details', 'GET'),
        apiDoc('v2/update-goal', 'PATCH'),
        apiDoc('v2/delete-goal', 'DEL'),
      ],
    },
  ],
};

export default sidebars;
