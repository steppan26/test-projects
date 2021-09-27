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
        width = "100%"
        iconAnimations = {{
          from: {
            transform: "scale(1) translateY(0em)",
          },
          to: {
            transform: "scale(1.6) translateY(-1.5em)",
          }
        }}
        galleryAnimations = {{
          from: {
            backgroundColor: "red",
            color: "green"
          },
          to: {
            backgroundColor: "black",
            color: "yellow"

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
