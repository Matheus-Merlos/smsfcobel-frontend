import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Title from '../Title';

import './Style.css';

export default function Page({
  pageName,
  description,
  Sidebar,
  children,
  hasTitle,
}) {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <section id="direita">
          <div id="formulario">
            {hasTitle && <Title title={pageName} spec={description} />}
            {children}
          </div>
        </section>
      </main>
    </>
  );
}

Page.defaultProps = {
  pageName: '',
  description: '',
};

Page.propTypes = {
  pageName: PropTypes.string,
  description: PropTypes.string,
  Sidebar: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
  hasTitle: PropTypes.bool.isRequired,
};
