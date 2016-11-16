import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import home from '../features/home';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';

angular.module('app', [uirouter, home])
    .config(routing)

