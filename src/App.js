import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import Homepage from "./pages/Homepage";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const App = () => {
  const particlesInit = async (main) => {
    // console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  // create object
  const classes = useStyles();

  return (
    <>
      <div className={classes.App}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            // background: {
            //   color: {
            //     value: "#0d47a1",
            //   },
            // },
            fpsLimit: 100,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "repulse",
                },
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#EEBC1D",
              },
              links: {
                color: "#08D9D6",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
        <BrowserRouter>
          <Header />
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id" component={CoinPage} />
          <Alert />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
