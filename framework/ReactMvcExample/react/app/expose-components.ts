import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import TestComponent, { TestComponentAsFunctional } from './testComponent/example';
import PopupComponentAsClass, { PopupComponent } from './testPopup/popup';

declare var global: any;

global['React'] = React;
global['ReactDOM'] = ReactDOM;
global['ReactDOMServer'] = ReactDOMServer;

global['TestComponent'] = TestComponent;
global['TestComponentAsFunctional'] = TestComponentAsFunctional;
global['PopupComponent'] = PopupComponent;
global['PopupComponentAsClass'] = PopupComponentAsClass;

import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();
