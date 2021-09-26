import './App.css';
import GooLoader from './components/gooLoader/GooLoader';
import projectOneIcon from './components/gooLoader/Images/Project1/icon.png'
import projectTwoIcon from './components/gooLoader/Images/Project2/icon.png'
import projectThreeIcon from './components/gooLoader/Images/Project3/icon.png'


const importAll = (assets) => {
  let images = {};
   assets.keys().forEach((item, index) => { images[item.replace('./', '')] = assets(item); });
  return images
}
const projectOneImages = importAll(require.context('./components/gooLoader/Images/Project1', false, /\.(png|jpe?g|svg)$/))
const projectTwoImages = importAll(require.context('./components/gooLoader/Images/Project2', false, /\.(png|jpe?g|svg)$/))
const projectThreeImages = importAll(require.context('./components/gooLoader/Images/Project3', false, /\.(png|jpe?g|svg)$/))


const App = () => {
  return (
    <div className="App">
      <GooLoader
        iconAnimations = {{
          from: {
            transform: "scale(1) translateY(0px)",
            opactiy: 0,
            delay: 200,
          },
          to: {
            transform: "scale(1.4) translateY(-50px)",
            delay: 200,
          }
        }}
        galleryAnimations = {{
          from: {

          },
          to: {

          }
        }}
        projectsArray={[
          {
            id: "ProjectOne",
            icon: projectOneIcon,
            screenshotsArray: projectOneImages
          },
          {
            id: "ProjectTwo",
            icon: projectTwoIcon,
            screenshotsArray: projectTwoImages
          },
          {
            id: "ProjectThree",
            icon: projectThreeIcon,
            screenshotsArray: projectThreeImages
          },
        ]}
      />
    </div>
  );
}

export default App;
