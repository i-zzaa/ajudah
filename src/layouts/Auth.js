/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import Footer from '@/components/Footer/Footer';
import routes from '@/routes';
import styles from '@/assets/jss/material-dashboard-pro-react/layouts/authStyle';
import login from '@/assets/img/background.png';
import Particles from 'react-particles-js';

const useStyles = makeStyles(styles);

export default function Pages() {
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = 'unset';
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    });
  };
  const getActiveRoute = (routes) => {
    const activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  return (
    <div>
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: `url(${login})` }}
        >
          <Particles
            style={{ position: 'absolute', height: '100%', top: '2%' }}
            params={{
              particles: {
                number: {
                  value: 50,
                },
                size: {
                  value: 3,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: 'repulse',
                  },
                },
              },
            }}
          />
          <Switch>
            {getRoutes(routes)} <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  );
}
