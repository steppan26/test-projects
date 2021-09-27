import './App.css';
import GooLoader from './components/gooLoader/GooLoader';
import projectOneIcon from './components/gooLoader/Images/Project1/icon.png'
import projectTwoIcon from './components/gooLoader/Images/Project2/icon.png'
import projectThreeIcon from './components/gooLoader/Images/Project3/icon.png'
import placeHolder from './components/gooLoader/Images/icon.png'



const importAll = (assets) => {
  let images = {};
   assets.keys().forEach((item, index) => { images[item.replace('./', '')] = assets(item); });
  return images
}
const projectOneImages = Object.values(importAll(require.context('./components/gooLoader/Images/Project1', false, /\.(png|jpe?g|svg)$/))).map(image => image.default)
const projectTwoImages = Object.values(importAll(require.context('./components/gooLoader/Images/Project2', false, /\.(png|jpe?g|svg)$/))).map(image => image.default)
const projectThreeImages = Object.values(importAll(require.context('./components/gooLoader/Images/Project3', false, /\.(png|jpe?g|svg)$/))).map(image => image.default)

const App = () => {
  return (
    <div className="App">
      <GooLoader
        iconAnimations = {{
          from: {
            transform: "scale(1) translateY(0px)",
            opactiy: 0,
            delay: 0,
          },
          to: {
            transform: "scale(1.4) translateY(-50px)",
            delay: 0,
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
            icon: placeHolder,
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
